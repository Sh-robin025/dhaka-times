import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_news } from "../../../redux/slices/newsSlice";

const ThirdStep = () => {
  const formData = useSelector(state => state.news.create_news);
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      <textarea
        rows="10"
        type="text"
        name="news"
        placeholder="Full News Type here..."
        defaultValue={formData.news}
        onChange={e => dispatch(set_news(e.target.value))}
        className="border py-1 w-full px-3 rounded-md outline-none focus:border-primary text-xl"
      />
    </div>
  );
};

export default ThirdStep;
