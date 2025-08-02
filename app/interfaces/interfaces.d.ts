interface images{
  poster:string[];
  fanart:string[];
}

interface ids{
  imdb:string;
  slug:string;
}

interface Movie {
  ids: ids;
  title: string;
  adult: boolean;
  images : images;
  imdb:string;
  poster : string[];
  backdrop_path: string;
  genre_ids: number[];
  year:number;
  language: string;
  rating:number ;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingMovie {
  query: string;
  movie_slug: number;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface Rating {
  Source: string;
  Value: string;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}
