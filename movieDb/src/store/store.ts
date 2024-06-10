import { create } from 'zustand';
import axios from 'axios';
import { Movie,MovieInput  } from '../model/Movie';
import { User } from '../model/User';

interface StoreState {
  movies: Movie[];
  user: User | null;
  apiKey: string | null;
  addMovie: (movie: MovieInput) => Promise<void>;
  removeMovie: (imdbid: string) => void;
  toggleFavorite: (imdbid: string) => void;
  getMovieDetails: (imdbid: string) => void;
  login: (credentials: User) => Promise<string>;
  logout: () => void;
  register: (userDetails: User) => Promise<string>;
  setUser: (user: User) => void;
  getKey: () => Promise<string | null>;
  getMovies: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  movies: [],
  user: JSON.parse(localStorage.getItem('user') as string) || null,
  apiKey: null,

  getKey: async (): Promise<string | null> => {
    try {
      const response = await axios.get('http://localhost:8080/api/keys');
      const apiKey = response.data.data;
      set({ apiKey });
      return apiKey;
    } catch (error) {
      console.error('Error fetching API key:', error);
      return null;
    }
  },

  getMovies: async () => {
    try {
      const apiKey = get().apiKey;
      if (!apiKey) {
        throw new Error('API key is not available');
      }
      const response = await axios.get(`http://localhost:8080/api/movies?key=${apiKey}`);
      const movies = response.data.data;
      set({ movies });
    } catch (error) {
      console.error('Error fetching or processing movies:', error);
    }
  },

  addMovie: async (movie: MovieInput) => {
    const apiKey = get().apiKey;
    if (!apiKey) {
      console.error('API key is not available');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/movies?key=${apiKey}`, movie);
      console.log('Server response:', response);

      if (response.data && response.data.data) {
        set((state) => ({
          movies: [...state.movies, response.data.data]
        }));
      } else {
        console.error('Unexpected server response format', response);
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  },

  removeMovie: async (imdbid) => {
    const apiKey = get().apiKey;
    if (!apiKey) {
      console.error('API key is not available');
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/movies/${imdbid}?key=${apiKey}`);
      set((state) => ({
        movies: state.movies.filter((movie) => movie.imdbid !== imdbid)
      }));
      localStorage.setItem('movies', JSON.stringify(get().movies.filter((movie) => movie.imdbid !== imdbid)));
    } catch (error) {
      console.error('Error removing movie:', error);
    }
  },

  toggleFavorite: async (imdbid) => {
    const apiKey = get().apiKey;
    if (!apiKey) {
      console.error('API key is not available');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/api/movies/${imdbid}?key=${apiKey}`);
      set((state) => ({
        movies: state.movies.map((movie) =>
          movie.imdbid === imdbid ? { ...movie, is_favorite: !movie.is_favorite } : movie
        ),
      }));
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  },

  getMovieDetails: async (imdbid) => {
    const apiKey = get().apiKey;
    if (!apiKey) {
      console.error('API key is not available');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/${imdbid}?key=${apiKey}`);
      const movie = response.data;
      set((state) => ({
        movies: state.movies.map((m) => (m.imdbid === imdbid ? { ...m, ...movie } : m)),
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
    } catch (error: any) {
      return error.response.data.message;
    }
  },

  setUser: (user) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },
}));
