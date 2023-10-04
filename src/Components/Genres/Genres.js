import React from "react";
import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage,
}) => {

  const API_KEY = "8d53350309a57f11e0785de7397ebe7a";
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
    );
    // console.log(data);
    setGenres(data.genres);
  };

  const handleAddChange = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1)
  };

  const handleRemoveChange = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          color="primary"
          style={{ margin: 2 }}
          onClick={() => handleRemoveChange(genre)}
        />
      ))}

      {genres.map((genre) => (
        <Chip
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          style={{ margin: 2 }}
          onClick={() => handleAddChange(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
