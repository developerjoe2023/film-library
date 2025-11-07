export interface ApiFilmCertification {
  iso_3166_1: string;
  certification: string;
}

export interface ApiFilmCertificationCountries {
  countries: ApiFilmCertification[];
}

export interface FilmDetailsReleases extends FilmDetails {
  releases?: ApiFilmCertificationCountries;
}

export interface FilmDetails {
  year: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface HomepageSearchBox {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

export interface FilmDetailsCard {
  movie: FilmDetails;
}
