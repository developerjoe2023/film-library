import { Box, TextField, Button } from "@mui/material";

interface ISearchBox {
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    handleSearch: () => void
}


export function SearchBox({ searchQuery, setSearchQuery, handleSearch }: ISearchBox) {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: 500,
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
                    opacity: 0.3,
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
                    value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: "50px", px: 3, py: 1 }}
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Box>
        </Box>
    )
}