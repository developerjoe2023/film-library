import { useState, useCallback } from "react";
import axios from "axios";
import {
  FilmDetails,
  FilmDetailsReleases,
  ApiFilmCertification,
} from "../types";

const certMap: Record<string, number> = {
  U: 0,
  PG: 1,
  "12": 2,
  "12A": 3,
  "15": 4,
  "18": 5,
};

const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Series",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export function useFilmSearchTMDB() {
  console.log(genreMap);
  const [movies, setMovies] = useState<FilmDetailsReleases[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const handleFilmSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    const minDelay = new Promise((resolve) => setTimeout(resolve, 700));

    try {
      const { data } = await axios.get(`https://api.tmdb.org/3/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query: searchQuery,
          include_adult: false,
        },
      });

      const baseResults: FilmDetails[] = data.results.slice(0, 10);

      const detailedMovies = await Promise.all(
        baseResults.map((movie) =>
          axios
            .get(`https://api.tmdb.org/3/movie/${movie.id}`, {
              params: {
                api_key: TMDB_API_KEY,
                append_to_response: "releases",
              },
            })
            .then((res) => res.data as FilmDetailsReleases)
            .catch(() => null),
        ),
      );

      await minDelay;

      const filteredMovies = detailedMovies
        .filter((detail): detail is FilmDetailsReleases => detail !== null)
        .filter((detail) => {
          const gbRelease = detail.releases?.countries?.find(
            (c: ApiFilmCertification) => c.iso_3166_1 === "GB",
          );
          const cert = gbRelease?.certification ?? "";
          return cert && certMap[cert] <= certMap["12A"];
        })
        .map((movie) => ({
          ...movie,
          year: movie.release_date?.split("-")[0] ?? "Unknown",
        }));

      setMovies(filteredMovies);
    } catch (err) {
      console.error("API error", err);
      setError("Something went wrong fetching movies.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, TMDB_API_KEY]);

  return {
    movies,
    searchQuery,
    setSearchQuery,
    handleFilmSearch,
    loading,
    error,
  };
}
