import React, { useEffect, useState } from "react";
import NewsBlock from "../components/common/NewsBlock";
import Spinner from "../components/common/Spinner";
import { newsByCategory } from "../services/NewsService";

const Bangladesh = () => {
  const [news, setNews] = useState();
  useEffect(() => {
    newsByCategory("Bangladesh").then(res => setNews(res.reverse()));
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

export default Bangladesh;
