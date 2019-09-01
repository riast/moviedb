import { observable, action } from 'mobx';
import { AsyncStorage } from 'react-native';
import { serialize, deserialize } from 'serializr';
import { Movie } from '../domains/Movie';
import * as MoviesService from '../services/MoviesService';

export class MovieViewModel {
  // this is an observable array of the Movie of our Movie editor
  // it is marked as observable because also adding and removing elements
  // from the Movie list should be tracked by the view and/or computed values.
  @observable static Movies: Movie[] = [];
  static currentPage: number = 1;
  @observable static refreshing: boolean = false;
  @observable static error: boolean = false;

  // static vars initialization
  static init() {
    MovieViewModel.load();
  }

  static dismissError() {
    MovieViewModel.error = false;
  }

  @action
  static add(movie: Movie) {
    MovieViewModel.Movies.push(movie);
    return movie;
  }

  // remove and deletes the given Movie
  @action
  static remove(movie: Movie) {
    const index = MovieViewModel.Movies.indexOf(movie);
    if (index > -1) {
      MovieViewModel.Movies.splice(index, 1);
    }
  }

  // load saved Movies, if possible.
  @action
  static async load() {
    try {
      const value = (await AsyncStorage.getItem('Movies')) || '[]';
      const json = JSON.parse(value);
      if (value !== null) {
        // We have data!!
        console.log(value);
        MovieViewModel.Movies = json.map((movie: JSON) => deserialize(Movie, movie));
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  @action
  static async deleteCache() {
    try {
      await AsyncStorage.removeItem('Movies');
      MovieViewModel.Movies = [];
    } catch (error) {
      // Error deleting data
    }
  }

  @action
  static async getFirstPageMovies() {
    try {
      MovieViewModel.refreshing = true;
      MovieViewModel.error = false;

      MovieViewModel.currentPage = 1;
      const movies = await MoviesService.getMovies(MovieViewModel.currentPage + '');
      console.log(movies);
      MovieViewModel.refreshing = false;

      MovieViewModel.deleteCache().then(() => {
        MovieViewModel.Movies = movies;
        MovieViewModel.save();
      });
    } catch (error) {
      MovieViewModel.refreshing = false;
      MovieViewModel.error = true;

      console.log(error);
    }
  }

  @action
  static async getNextPageOfMovies() {
    try {
      MovieViewModel.refreshing = true;
      MovieViewModel.error = false;

      MovieViewModel.currentPage++;
      console.log('getNextPageOfMovies:' + MovieViewModel.currentPage);

      const movies = await MoviesService.getMovies(MovieViewModel.currentPage + '');
      MovieViewModel.refreshing = false;

      console.log(movies);
      console.log(MovieViewModel.Movies);

      movies.forEach((movie) => MovieViewModel.Movies.push(movie));

      MovieViewModel.save();
    } catch (error) {
      MovieViewModel.refreshing = false;
      MovieViewModel.error = true;

      console.log(error);
    }
  }

  // save Movies, if possible
  @action
  static async save() {
    try {
      await AsyncStorage.setItem(
        'Movies',
        JSON.stringify(MovieViewModel.Movies.map((movie) => serialize(movie))),
      );
    } catch (error) {
      // Error saving data
    }
  }
}
