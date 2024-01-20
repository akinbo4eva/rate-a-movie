import { useEffect, useState } from "react";
import Main from "./components/Main/Main";
import Navbar from "./components/Nav/Navbar";
import MovieList from "./components/Main/ListBox/MovieList";
import Box from "./components/Main/Box";
import WatchedSummary from "./components/Main/WatchedBox/WatchedSummary";
import WatchedMoviesList from "./components/Main/WatchedBox/WatchedMovieList";
import "./index.css";
import Loader from "./Loader";
import ErrorMessage from "./components/Main/ErrorMessage";
import MovieDetails from "./components/Main/WatchedBox/MovieDetails";
import { useAPi } from "./Hooks/useApi";
import { useLocalStorageState } from "./Hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useAPi(query, handlCloseMovie);

  const [watched, setWatched] = useLocalStorageState([], "watched");
  function handleSelectedMovie(movieId) {
    setSelectedId((currId) => (movieId === currId ? null : movieId));
  }

  function handlCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleWatchedDelete(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              id={selectedId}
              onCloseMovie={handlCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleWatchedDelete}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
