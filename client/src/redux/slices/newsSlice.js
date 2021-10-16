import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetch_news_detail: {},
  create_news: {
    headline: "",
    image: "",
    img_cap: "",
    meta_desc: "",
    author: "",
    category: "",
    news: "",
  },
};

const newsSlice = createSlice({
  name: "newsSlice",
  initialState,
  reducers: {
    set_detail_news: (state, { payload }) => {
      state.fetch_news_detail = payload;
    },
    set_headline: (state, { payload }) => {
      state.create_news.headline = payload;
    },
    set_image: (state, { payload }) => {
      state.create_news.image = payload;
    },
    set_img_cap: (state, { payload }) => {
      state.create_news.img_cap = payload;
    },
    set_meta_desc: (state, { payload }) => {
      state.create_news.meta_desc = payload;
    },
    set_news: (state, { payload }) => {
      state.create_news.news = payload;
    },
    set_author: (state, { payload }) => {
      state.create_news.author = payload;
    },
    set_category: (state, { payload }) => {
      state.create_news.category = payload;
    },
  },
});

export const {
  set_detail_news,
  set_headline,
  set_image,
  set_img_cap,
  set_meta_desc,
  set_news,
  set_author,
  set_category,
} = newsSlice.actions;
export default newsSlice.reducer;
