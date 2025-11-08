import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { FilmDetailsCard } from "./types";

export function MovieCard({ movie }: FilmDetailsCard) {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const defaultPoster = "https://placehold.co/500x750/png?text=No+Poster";
  const posterPath = movie.poster_path || "";
  const imgSrc = posterPath.startsWith("/")
    ? `${baseUrl}${posterPath}`
    : posterPath || defaultPoster;

  return (
    <Card sx={{ maxWidth: 350, border: "1px solid grey" }}>
      <CardMedia
        sx={{ aspectRatio: 3 / 4, objectFit: "fill" }}
        component="img"
        image={imgSrc}
        alt={`${movie.title} poster`}
      />
      <Typography variant="h5" align="center">
        {movie.title}
      </Typography>
      <CardContent>
        <Typography variant="h6">{`Year: ${movie.year}`}</Typography>
        <Typography variant="body2" color="primary">
          {`Rating: ${movie.vote_average}/10`}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
