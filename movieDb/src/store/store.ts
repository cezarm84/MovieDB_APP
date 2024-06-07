import { create } from 'zustand';
import axios from 'axios';

 export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  trailerUrl: string;
  isFavorite: boolean;
}

interface User {
  username: string;
  password: string;
}

export interface StoreState {
  movies: Movie[];
  user: User | null;
  apiKey: string | null;
  getApiKey: () => void;
  getMovies: () => void;
  addMovie: (movie: Omit<Movie, 'id' | 'isFavorite'>) => void;
  removeMovie: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getMovieDetails: (id: string) => void;
  login: (credentials: User) => Promise<string>;
  logout: () => void;
  register: (userDetails: User) => Promise<string>;
  setUser: (user: User) => void;

}

export const useStore = create<StoreState>((set, get) => ({
  movies: [],
  user: JSON.parse(localStorage.getItem('user') as string) || null,
  apiKey: null,


  getApiKey: async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/keys');
      set({ apiKey: response.data.key });
    } catch (error) {
      console.error('Error fetching API key:', error);
    }
  },
  getMovies: async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/movies?key=${get().apiKey}');
      set({ movies: response.data });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  },
  addMovie: async (movie) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/movies?key=${get().apiKey}`, movie);
      set((state) => ({ movies: [...state.movies, response.data] }));
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  },
  removeMovie: async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/movies/${id}?key=${get().apiKey}`);
      set((state) => ({ movies: state.movies.filter((movie) => movie.id !== id) }));
    } catch (error) {
      console.error('Error removing movie:', error);
    }
  },
    toggleFavorite: async (id) => {
      try {
        await axios.put(`http://localhost:8000/api/movies/${id}?key=${get().apiKey}`);
        set((state) => ({
          movies: state.movies.map((movie) =>
            movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
          ),
        }));
      } catch (error) {
        console.error('Error toggling favorite status:', error);
      }
    },
    getMovieDetails: async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/movies/${id}?key=${get().apiKey}`);
        const movie = response.data;
        set((state) => ({
          movies: state.movies.map((m) => (m.id === id ? { ...m, ...movie } : m)),
        }));
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    },
  login: async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      set({ user: response.data.user });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.message;
    } catch (error: any) {
      return error.response.data.message;
    }
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },
  register: async (userDetails) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', userDetails);
      set({ user: response.data.user });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.message;
    } catch (error : any ) {
      return error.response.data.message;
    }
  },
  setUser: (user) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },
}));
