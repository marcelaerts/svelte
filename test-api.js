const tmdbToken = process.env.TMDB_TOKEN;
const tmdbBaseUrl = "https://api.themoviedb.org/3";

const getPopularMovies = async () => {
  const endpoint = "/movie/popular";
  const requestParams = `?language=nl-NL`;
  const url = `${tmdbBaseUrl}${endpoint}${requestParams}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + tmdbToken
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    data.results.forEach(movie => console.log(movie.title));
  } catch (error) {
    console.error(error.message);
  }
};

getPopularMovies();
