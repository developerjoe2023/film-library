import React, { useState } from "react";
import { Typography, AppBar, Toolbar, IconButton, Button, Box, TextField } from "@mui/material";
import { AccountCircle } from '@mui/icons-material';
import { CardGrid } from "./CardGrid";
import { IMovie } from "./CardGrid";
import { SearchBox } from "./SearchBox";

import axios from "axios";

function App() {
  const [movies, setMovies] = useState([])
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    axios.get(`https://api.tmdb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`).then(response => {
      setMovies(response.data.results.map((movie: IMovie) => ({
        ...movie,
        year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'
      })))
    })
      .catch(error => console.error('API error', error))
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: "black" }}>
          <IconButton size="large" color="inherit" edge="start">
            <AccountCircle />
          </IconButton>
          <Typography variant="h6" sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            Movie Library
          </Typography>
          <Box sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2
          }}>
            <Button color="inherit">
              Home
            </Button>
            <Button color="inherit">
              Movies
            </Button>
            <Button color="inherit">
              Shows
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>
      </Box>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      <CardGrid
        movies={movies}
      />
    </>
  );
}

export default App;
