import React from "react";
import { FaShare } from "react-icons/fa";

const Details = ({ headline, createdAt, image, newsImage, news, author, img_cap }) => {
  return (
    <div className="w-full">
      <h1 className="text-4xl mt-5">{headline}</h1>
      <span className="flex justify-between w-8/12 py-5">
        <small className="text-gray text-sm">Published : {createdAt}</small>
        <a
          className=" p-3 rounded-full bg-light_gray text-primary cursor-pointer"
          type="button"
          role="button"
          title="Share on facebook"
          href="https://www.facebook.com/sharer/sharer.php?u=http://theDhakatimes.mitnogit.com"
          target="_blank"
          rel="noreferrer"
        >
          <FaShare />
        </a>
      </span>

      <figure className="mb-5">
        <img src={image || newsImage} alt="" className="h-" />
        <figcaption className="text-sm text-gray">{img_cap}</figcaption>
      </figure>

      <p className="text-lg px-5 text-justify">
        {news.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <small>by {author}</small>
    </div>
  );
};

export default Details;
