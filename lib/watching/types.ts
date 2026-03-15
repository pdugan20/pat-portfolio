// Watching domain types
// Typed from Rewind API watching endpoints

import type { ImageAttachment, PaginationMeta } from '@/lib/rewind/types';

// Movie (returned in list and detail endpoints)

export interface Movie {
  id: number;
  title: string;
  year: number;
  director: string | null;
  directors: string[];
  genres: string[];
  duration_min: number | null;
  rating: number | null;
  image: ImageAttachment | null;
  imdb_id: string | null;
  tmdb_id: number | null;
  tmdb_rating: number | null;
  tagline: string | null;
  summary: string | null;
}

// Watch event (from /recent endpoint)

export interface WatchEvent {
  movie: Movie;
  watched_at: string;
  source: 'plex' | 'letterboxd' | 'manual';
  user_rating: number | null;
  percent_complete: number | null;
  rewatch: boolean;
}

// Stats (from /stats endpoint)

export interface WatchStats {
  total_movies: number;
  total_watch_time_hours: number;
  movies_this_year: number;
  avg_per_month: number;
  top_genre: string | null;
  top_decade: number | null;
  top_director: string | null;
  total_shows: number;
  total_episodes_watched: number;
  episodes_this_year: number;
}

// Breakdown stats

export interface GenreStat {
  name: string;
  count: number;
  percentage: number;
}

export interface DecadeStat {
  decade: number;
  count: number;
}

export interface DirectorStat {
  name: string;
  count: number;
}

// Ratings and reviews

export interface RatingEntry {
  movie: Movie;
  user_rating: number;
  watched_at: string;
  source: 'plex' | 'letterboxd' | 'manual';
}

export interface ReviewEntry {
  movie: Movie;
  user_rating: number | null;
  review: string;
  watched_at: string;
  source: 'plex' | 'letterboxd' | 'manual';
}

// Year-in-review

export interface WatchingYearResponse {
  year: number;
  total_movies: number;
  genres: { name: string; count: number }[];
  decades: DecadeStat[];
  monthly: { month: string; count: number }[];
  top_rated: {
    movie: Movie;
    user_rating: number;
    watched_at: string;
  }[];
}

// API response wrappers

export interface MoviesResponse {
  data: Movie[];
  pagination: PaginationMeta;
}

export interface RatingsResponse {
  data: RatingEntry[];
  pagination: PaginationMeta;
}

export interface ReviewsResponse {
  data: ReviewEntry[];
  pagination: PaginationMeta;
}
