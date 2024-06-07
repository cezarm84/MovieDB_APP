import create from 'zustand';
import axios from 'axios';

interface Movie {
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

interface StoreState {
  movies: Movie[];
  user: User | null;
  getMovies: () => Promise<void>;
  addMovie: (movie: Omit<Movie, 'id' | 'isFavorite'>) => void;
  removeMovie: (id: string) => void;
  toggleFavorite: (id: string) => void;
  login: (credentials: User) => Promise<string>;
  logout: () => void;
  register: (userDetails: User) => Promise<string>;
  setUser: (user: User) => void;

}

export const useStore = create<StoreState>((set) => ({
  movies: [],
  user: JSON.parse(localStorage.getItem('user') as string) || null,
  getMovies: async () =>{
    try {
      const response = await axios.get('http://localhost:8080/api/movies', {
        params: {
          key: 'key',
        },
      });
      set({ movies: response.data });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  },
  addMovie: (movie) =>
    set((state) => ({
      movies: [
        ...state.movies,
        { ...movie, id: Math.random().toString(), isFavorite: false },
      ],
    })),
  removeMovie: (id) =>
    set((state) => ({
      movies: state.movies.filter((movie) => movie.id !== id),
    })),
  toggleFavorite: (id) =>
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
      ),
    })),
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
