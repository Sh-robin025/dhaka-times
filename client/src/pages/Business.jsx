import React, { useEffect, useState } from "react";
import NewsBlock from "../components/common/NewsBlock";
import Spinner from "../components/common/Spinner";
import { newsByCategory } from "../services/NewsService";

const Business = () => {
  const [news, setNews] = useState();
  console.log(news);
  useEffect(() => {
    newsByCategory("Business").then(res => setNews(res.reverse()));
  }, []);
  return (
    <div>
      {news ? (
        news.map(item => (
          <NewsBlock
            key={item._id}
            id={item._id}
            heading={item.headline}
            description={item.meta_desc}
            image={item.newsImage || item.image}
            time={item.time}
          />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Business;
