import { Movie } from '../domains/Movie';
import { serialize, deserialize } from 'serializr';
import { getWithTimeout } from '../helpers/NetworkHelper';

export async function getMovies(
  page: string,
  filters = {
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: 'true',
    include_video: 'true',
    year: '2019',
  },
): Promise<Movie[]> {
  let response = await getWithTimeout(
    'https://api.themoviedb.org/3/discover/movie',
    {
      params: {
        api_key: '9b088081df3c53a24dbcdaf879a01df7',
        page,
        ...filters,
      },
      timeout: 30000,
    },
    3000,
  ).catch((error) => {
    let errorMessage = '';
    if (error.response) {
      errorMessage = 'Error with response.';
    } else if (error.request) {
      errorMessage = 'No response from the server.';
    } else {
      errorMessage = 'Could not make the request';
    }
    console.log(error.config);
    throw Error(errorMessage);
  });

  console.log('data' in response);
  console.log(response);

  if ('data' in response && 'results' in response.data) {
    let movies: Movie[] = response.data.results.map((movie: JSON) => deserialize(Movie, movie));

    console.log(response.data);
    return movies;
  } else {
    throw Error('Error with response');
  }
}
