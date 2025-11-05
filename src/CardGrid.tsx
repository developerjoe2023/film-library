import { Grid } from "@mui/material"

import { MovieCard } from "./MovieCard"

export interface IMovie {
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

export function CardGrid({ movies }: { movies: IMovie[] }) {
    return (
        <Grid container sx={{ justifyContent: "center", spacing: 2, rowSpacing: 1, mt: 4, ml: 2 }} >
            {movies.map((movie: IMovie) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
                    <MovieCard
                        movie={movie} />
                </Grid>
            ))}
        </Grid>
    )
}