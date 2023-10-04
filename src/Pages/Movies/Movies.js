import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayContent from "../../Components/DisplayContent/DisplayContent";
import "./Movies.css";
import CustomPagination from "../../Components/CustomPagination/CustomPagination";
import Genres from "../../Components/Genres/Genres";
import useGenres from "../../Components/Hooks/useGenres";

const Movies = () => {
  const API_KEY = "8d53350309a57f11e0785de7397ebe7a";

  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const genreforURL = useGenres(selectedGenres);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=&falsenclude_video=false&page=${page}&with_genres=${genreforURL}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>

      <Genres
        type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />

      <div className="movies">
        {content &&
          content.map((c) => (
            <DisplayContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title}
              date={c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={Math.min(numOfPages,500)} />
      )}
    </div>
  );
};

export default Movies;
