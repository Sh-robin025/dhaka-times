import React, { useEffect, useState } from "react";
import NewsBlock from "../components/common/NewsBlock";
import Spinner from "../components/common/Spinner";
import Carousel from "../components/home/Carousel";
import SideBar from "../components/home/SideBar";
import { allNews } from "../services/NewsService";

const Home = () => {
  const [news, setNews] = useState();

  useEffect(() => {
    allNews().then(res => setNews(res.reverse()));
  }, []);

  return (
    <div>
      <Carousel />
      <div className="flex flex-wrap justify-between ">
        <div className="w-2/3">
          {news ? (
            news.map(item => (
              <NewsBlock
                key={item._id}
                id={item._id}
                heading={item.headline}
                description={item.meta_desc}
                image={item.newsImage || item.image}
                time={item.createdAt}
              />
            ))
          ) : (
            <Spinner />
          )}
        </div>
        <div className="w-1/3 mt-5">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
