import React from "react";
import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../Components/Configuration/Config";
import ContentModal from "../../Components/ContentModal/ContentModal";
import "./DisplayContent.css";

const DisplayContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average.toFixed(1)}
        color={vote_average > 6 ? "primary" : "secondary"}
        overlap="rectangular"  
      />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>

      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default DisplayContent;
