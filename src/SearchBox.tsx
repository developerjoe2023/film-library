import { Box, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchBox {
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    handleSearch: () => void
}

export function SearchBox({ searchQuery, setSearchQuery, handleSearch }: ISearchBox) {
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault()
            handleSearch()
        }
    }

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "50vh",
                borderRadius: 3,
                overflow: "hidden",
                mx: "auto"
            }}
        >
            <Box
                component="img"
                src="src/assets/kpop-demon-hunters-3840x2160-23698.jpg"
                alt="kpop-demon-hunters-background"
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 0%",
                    opacity: 0.4,
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
            />
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    px: 2
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    sx={{
                        width: "60%",
                        maxWidth: 400,
                        backgroundColor: "white",
                        borderRadius: "50px"
                    }}
                    onKeyDown={handleKeyDown}
                    value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{ borderRadius: "50px", px: 3, py: 1, textTransform: "none" }}
                                        onClick={handleSearch}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }

                    }}
                />
            </Box>
        </Box>
    )
}