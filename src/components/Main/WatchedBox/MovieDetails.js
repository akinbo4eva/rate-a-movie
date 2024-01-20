import { useEffect, useRef, useState } from "react";
import Loader from "../../../Loader";
import StarRating from "./StarRating/StarRating";
import { useEnterKey } from "../../../Hooks/useEnterKey";

const KEY = "b6eae4ab";

function MovieDetails({ id, onCloseMovie, onAddWatched, watched }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  // to get number of times before final rating of users
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current++;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(id);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === id
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  function handleAdd() {
    const newWatchedMovies = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovies);
    onCloseMovie();
  }

  useEffect(() => {
    async function fetchAmovie() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
      const data = await res.json();
      setMovieDetails(data);
      setIsLoading(false);
    }
    fetchAmovie();
  }, [id]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "rateAmovie";
    };
  }, [title]);

  // custom hook instead of of using it side effect here

  useEnterKey("Escape", onCloseMovie);

  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Escape") {
  //       onCloseMovie();
  //     }
  //   }
  //   document.addEventListener("keydown", callback);
  //   return function () {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>

            <img src={poster} alt={`Poster of movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            {/* <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div> */}
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                // <p>
                //   You rated with movie {watchedUserRating} <span>⭐️</span>
                // </p>
                `You rated this movie ${watchedUserRating}`
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
