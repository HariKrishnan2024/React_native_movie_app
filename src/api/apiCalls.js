const apikey = 'ae46cf601665ce1fb76d7580a2734002';
export const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
export const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
export const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const searchMovies = keyword => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};

export const movieDetails = id => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};

export const movieCastDetails = id => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};

export const baseImgPath = (size, path) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
