import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { HomepageSearchBox } from "./types";
import CircularProgress from "@mui/material/CircularProgress";
import backgroundImg from "./assets/kpop-demon-hunters-3840x2160-23698.jpg";

export function SearchBox({
  searchQuery,
  setSearchQuery,
  handleFilmSearch,
  loading,
}: HomepageSearchBox) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleFilmSearch();
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
        mx: "auto",
      }}
    >
      <Box
        component="img"
        src={backgroundImg}
        alt="kpop-demon-hunters-background"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 0%",
          opacity: 0.4,
          position: "absolute",
          top: 0,
          left: 0,
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
          px: 2,
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search..."
          sx={{
            width: "60%",
            maxWidth: 345,
            backgroundColor: "white",
            borderRadius: "50px",
          }}
          onKeyDown={handleKeyDown}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <IconButton
                      sx={{
                        borderRadius: "50px",
                        px: 3,
                        py: 1,
                        textTransform: "none",
                      }}
                      onClick={handleFilmSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
