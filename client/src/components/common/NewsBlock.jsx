import React from "react";
import { Link } from "react-router-dom";

const NewsBlock = ({ heading, description, image, time, id }) => (
  <article className="flex border border-light_gray p-5 mt-5 rounded">
    <Link to={`/details/${id}`} className="h-32 w-3/12">
      <img src={image} alt="" className="h-full w-full" />
    </Link>

    <span className="px-5 w-9/12">
      <Link to={`/details/${id}`} className="text-xl font-semibold hover:text-primary">
        {heading}
      </Link>
      <p className="text-justify">{description}</p>
      <small className="text-gray-600">{time}</small>
    </span>
  </article>
);

export default NewsBlock;
