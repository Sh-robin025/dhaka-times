import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { RiImageEditFill } from "react-icons/ri";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { set_open_popup } from "../../../redux/slices/popupSlice";
import { handleDelete } from "../../../services/NewsService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { set_loader } from "../../../redux/slices/loadingSlice";

const Administration = () => {
  const loader = useSelector(state => state.loader.isLoading);
  const newsDetails = useSelector(state => state.news.fetch_news_detail);
  const { _id } = newsDetails;
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteNews = async id => {
    dispatch(set_loader(true));
    const res = await handleDelete(id);
    if (res.status === 200) {
      toast.info(res.message);
      dispatch(set_loader(false));
      history.push("/");
    }
  };

  return (
    <Menu as="div" className="relative rounded-md ">
      <Menu.Button className="bg-primary w-full text-light py-2 cursor-pointer px-5 flex gap-3 items-center justify-center rounded-md">
        <FaEdit /> Customize <IoIosArrowDown />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-in duration-100"
        enterFrom="transform opacity-100 scale-50"
        enterTo="transform opacity-100 scale-90"
        leave="transition ease-out duration-200"
        leaveFrom="transform opacity-100 scale-50"
        leaveTo="transform opacity-0 scale-50"
      >
        <Menu.Items as="div" className="w-full absolute right-0 origin-top z-100 shadow-lg">
          <ul className="flex flex-col gap-3 text-center">
            <li
              onClick={() => dispatch(set_open_popup("custom_headline"))}
              className="flex items-center justify-center gap-2 hover:text-primary text-xl py-2 cursor-pointer hover:shadow-lg shadow-md"
            >
              <AiFillEdit /> Edit Headline
            </li>
            <li
              onClick={() => dispatch(set_open_popup("custom_image"))}
              className="flex items-center justify-center gap-2 hover:text-primary text-xl py-2 cursor-pointer hover:shadow-lg shadow-md"
            >
              <RiImageEditFill /> Edit Image
            </li>
            <li
              onClick={() => dispatch(set_open_popup("custom_news"))}
              className="flex items-center justify-center gap-2 hover:text-primary text-xl py-2 cursor-pointer hover:shadow-lg shadow-md"
            >
              <AiFillEdit /> Edit News
            </li>
            <li
              onClick={() => dispatch(set_open_popup("custom_meta_desc"))}
              className="flex items-center justify-center gap-2 hover:text-primary text-xl py-2 cursor-pointer hover:shadow-lg shadow-md"
            >
              <AiFillEdit /> Edit Meta_desc
            </li>
            <li
              onClick={() => deleteNews(_id)}
              className="flex items-center justify-center gap-2 bg-danger text-light text-xl py-2 cursor-pointer hover:shadow-lg shadow-md"
            >
              <AiFillDelete />
              {loader ? "Pls wait..." : "Delete"}
            </li>
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Administration;
