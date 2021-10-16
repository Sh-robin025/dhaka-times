import React, { useEffect } from "react";
import { useParams } from "react-router";
import Carousel from "../components/home/Carousel";
import { detailsById } from "../services/NewsService";
import Spinner from "../components/common/Spinner";
import Details from "../components/news/Details";
import Administration from "../components/news/admin/Administration";
import { useDispatch, useSelector } from "react-redux";
import { set_detail_news } from "../redux/slices/newsSlice";

const DetailNews = () => {
  const user = useSelector(state => state.user.user);
  const newsDetails = useSelector(state => state.news.fetch_news_detail);
  const { headline, image, newsImage, img_cap, news, author, createdAt } = newsDetails;
  const { id } = useParams();
  const handleSpinner = Object.keys(newsDetails).length === 0;

  const dispatch = useDispatch();

  useEffect(() => {
    detailsById(id).then(res => dispatch(set_detail_news(res)));
  }, [dispatch, id]);

  return (
    <div>
      <Carousel />
      {handleSpinner ? (
        <Spinner />
      ) : (
        <div className="flex gap-5">
          <div className="w-3/4">
            <Details
              headline={headline}
              image={image}
              newsImage={newsImage}
              img_cap={img_cap}
              news={news}
              author={author}
              createdAt={createdAt}
            />
          </div>
          <div className="w-1/4 pt-5">
            {user?.role === "admin" ? (
              <Administration />
            ) : (
              <h2 className="text-center text-xl underline">advertise</h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailNews;
