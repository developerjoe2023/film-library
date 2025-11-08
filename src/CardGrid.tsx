import { Grid } from "@mui/material";

import { MovieCard } from "./MovieCard";
import { FilmDetails } from "./types";

export function CardGrid({ movies }: { movies: FilmDetails[] }) {
  return (
    <Grid
      container
      sx={{
        spacing: 2,
        rowSpacing: 1,
        justifyContent: "center",
        mt: 4,
      }}
    >
      {movies.map((movie: FilmDetails) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
