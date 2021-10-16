import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsBlock from "../components/common/NewsBlock";
import Spinner from "../components/common/Spinner";
import { set_open_popup } from "../redux/slices/popupSlice";
import { newsByCategory } from "../services/NewsService";

const International = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [news, setNews] = useState();

  useEffect(() => {
    if (!user) {
      dispatch(set_open_popup("auth"));
    }
    newsByCategory("International").then(res => setNews(res.reverse()));
  }, [dispatch, user]);

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

export default International;
