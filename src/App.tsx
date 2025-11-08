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
  Container,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { CardGrid } from "./CardGrid";
import { SearchBox } from "./SearchBox";
import { useFilmSearchTMDB } from "./api/tmdb";

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
  const {
    movies,
    searchQuery,
    setSearchQuery,
    handleFilmSearch,
    loading,
    error,
  } = useFilmSearchTMDB();
  console.log(error);
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
        handleFilmSearch={handleFilmSearch}
        loading={loading}
      />
      <Box sx={{ width: "100%", height: "3vh" }} />
      <Container maxWidth="lg">
        <CardGrid movies={movies} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
