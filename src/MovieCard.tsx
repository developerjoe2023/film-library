import { Card, CardMedia, CardContent, CardActions, Typography } from "@mui/material"
import { IMovie } from "./CardGrid";

interface IMovieCard {
    movie: IMovie
}

export function MovieCard({ movie }: IMovieCard) {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const imgSrc = movie.poster_path.startsWith('/') ? movie.poster_path : `${baseUrl}${movie.poster_path}`

    return (
        <Card sx={{ maxWidth: 350, border: '1px solid grey' }}>
            <CardMedia
                sx={{ aspectRatio: 3 / 4, objectFit: "cover" }}
                component="img"
                image={imgSrc}
            />
            <Typography variant="h5" align="center">
                {movie.title}
            </Typography>
            <CardContent>
                <Typography variant="h6">
                    {`Year: ${movie.year}`}
                </Typography>
                <Typography variant="body2" color="primary">
                    {`Rating: ${movie.vote_average}/10`}
                </Typography>
                <Typography variant="body2" sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{movie.overview}</Typography>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    )
}