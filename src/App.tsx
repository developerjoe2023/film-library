import React, { useState } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { CardGrid } from "./CardGrid";
import { SearchBox } from "./SearchBox";
import {
  ApiFilmCertification,
  FilmDetails,
  FilmDetailsReleases,
} from "./types";

import axios from "axios";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff", // 👈 sets the app background color (dark gray / black)
    },
    text: {
      primary: "#000000ff", // 👈 makes all text white
    },
  },
});

function App() {
  const [movies, setMovies] = useState<FilmDetailsReleases[]>([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    axios
      .get(
        `https://api.tmdb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}&include_adult=false`,
      )
      .then(async (response) => {
        const movies = response.data.results;

        const detailedMovies = await Promise.all(
          movies.map((movie: FilmDetails) =>
            axios
              .get(
                `https://api.tmdb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=releases`,
              )
              .then(
                (detailResponse) => detailResponse.data as FilmDetailsReleases,
              ),
          ),
        );

        const filteredMovies: FilmDetailsReleases[] = detailedMovies.filter(
          (detail: FilmDetailsReleases) => {
            const gbRelease = detail.releases?.countries?.find(
              (c: ApiFilmCertification) => c.iso_3166_1 === "GB",
            );
            const cert = gbRelease?.certification || "";

            const certMap: { [key: string]: number } = {
              U: 0,
              PG: 1,
              "12": 2,
              "12A": 3,
              "15": 4,
              "18": 5,
            };
            return certMap[cert] <= certMap["12A"];
          },
        );

        setMovies(
          filteredMovies.map((movie: FilmDetailsReleases) => ({
            ...movie,
            year: movie.release_date
              ? movie.release_date.split("-")[0]
              : "Unknown",
          })),
        );
      })
      .catch((error) => console.error("API error", error));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: "#000000ff" }}>
          <IconButton size="large" color="inherit" edge="start">
            <AccountCircle />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Movie Library
          </Typography>
          <Box
            sx={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Button color="inherit">Home</Button>
            <Button color="inherit">Movies</Button>
            <Button color="inherit">Shows</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box></Box>
      <Box sx={{ width: "100%", height: "3vh" }} />
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Box sx={{ width: "100%", height: "3vh" }} />
      <CardGrid movies={movies} />
    </ThemeProvider>
  );
}

export default App;
