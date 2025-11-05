import React, { useState } from "react";
import { Typography, AppBar, Toolbar, IconButton, Button, Box } from "@mui/material";
import { AccountCircle } from '@mui/icons-material';
import { CardGrid } from "./CardGrid";

import mockApiRespose from './mockAPIResponse.json'

function App() {
  const [movies, setMovies] = useState(mockApiRespose.results.map(movie => ({
    ...movie,
    year: movie.release_date.split('-')[0]
  })))

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
      <CardGrid
        movies={movies}
      />
    </>
  );
}

export default App;
