import { observable } from 'mobx';
import { createSimpleSchema, identifier, object, serializable } from 'serializr';
import { IGenres } from '../interfaces';

const genresSerializerSchema = createSimpleSchema({
  id: true,
  name: true,
});

// this is our domain model class
export class Movie {
  @serializable(identifier())
  @observable
  id: number;
  @serializable
  @observable
  backdrop_path: string;
  @serializable(object(genresSerializerSchema))
  @observable
  genres?: IGenres[] | null | undefined;
  @serializable
  @observable
  original_language: string;
  @serializable
  @observable
  original_title: string;
  @serializable
  @observable
  overview: string;
  @serializable
  @observable
  popularity: number;
  @serializable
  @observable
  poster_path: string;
  @serializable
  @observable
  release_date: string;
  @serializable
  @observable
  runtime: number;
  @serializable
  @observable
  status: string;
  @serializable
  @observable
  tagline: string;
  @serializable
  @observable
  title: string;
  @serializable
  @observable
  video: boolean;
  @serializable
  @observable
  vote_average: number;
  @serializable
  @observable
  vote_count: number;

  constructor(
    id: number,
    backdrop_path: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    runtime: number,
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    genres?: (IGenres)[],
  ) {
    this.id = id;
    this.backdrop_path = backdrop_path;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.popularity = popularity;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.runtime = runtime;
    this.status = status;
    this.tagline = tagline;
    this.title = title;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.genres = genres;
  }

  isValid() {
    // a text is required
    return this.id > 0;
  }
}
