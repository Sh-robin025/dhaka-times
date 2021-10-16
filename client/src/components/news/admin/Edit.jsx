import React, { useState } from "react";
import { FaFileImage, FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { set_detail_news } from "../../../redux/slices/newsSlice";
import { set_open_popup } from "../../../redux/slices/popupSlice";
import { detailsById, handleUpdate } from "../../../services/NewsService";
import PopupLayout from "../../layout/PopupLayout";
import { set_loader } from "../../../redux/slices/loadingSlice";

const Edit = () => {
  const loader = useSelector(state => state.loader.isLoading);
  const popUp = useSelector(state => state.popup.open_popup);
  const editNews = useSelector(state => state.news.fetch_news_detail);
  const [updateImage, setUpdateImage] = useState();
  const { register, handleSubmit } = useForm();

  const inputStyle = "border py-1 px-3 rounded-md outline-none focus:border-primary w-full";

  const dispatch = useDispatch();

  const handleBase64 = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== "") {
      reader.onloadend = () => {
        // dispatch(set_image(reader.result));
        setUpdateImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateContent = async data => {
    dispatch(set_loader(true));
    // here data send dynamically.
    const res = await handleUpdate(
      updateImage ? { ...data, image: updateImage } : data,
      editNews._id,
    );
    if (res.status === 200) {
      const fetchUpdate = await detailsById(editNews._id);
      dispatch(set_detail_news(fetchUpdate));
      dispatch(set_open_popup(""));
      dispatch(set_loader(false));
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <PopupLayout>
      <div className="relative my-6 mx-auto w-4/6">
        <div className="w-full border-0 rounded-lg shadow-lg relative flex flex-col bg-light outline-none focus:outline-none">
          <div className="p-3 border-b">
            <button className="ml-auto float-right" onClick={() => dispatch(set_open_popup(""))}>
              <span className="text-danger h-6 w-6 text-2xl">
                <FaWindowClose />
              </span>
            </button>
          </div>
          <h1 className="text-3xl uppercase font-medium text-center my-5">
            Update <span className={popUp === "custom_news" ? "text-primary" : ""}>News </span>
            <span className="font-medium text-primary">
              {popUp === "custom_headline" && "Headline"}
              {popUp === "custom_image" && "Image and Caption"}
              {popUp === "custom_meta_desc" && "Meta Description"}
            </span>
          </h1>
          <form action="POST" className="px-10" onSubmit={handleSubmit(updateContent)}>
            {popUp === "custom_headline" && (
              <textarea
                type="text"
                name="headline"
                defaultValue={editNews.headline}
                placeholder="Headline Type here..."
                {...register("headline", { required: true })}
                className={`${inputStyle} text-3xl`}
              />
            )}
            {popUp === "custom_image" && (
              <>
                <div className="w-full rounded-lg overflow-hidden flex justify-around items-center">
                  <div className="relative h-28 w-5/12 rounded-lg border-dashed border-2 border-primary bg-light_gray flex justify-center items-center">
                    <div className="absolute">
                      <div className="flex flex-col items-center">
                        <FaFileImage className="text-3xl text-secondary font-semibold" />
                        <span className="block text-gray font-normal">
                          Click here to change image
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="image"
                      // {...register("image")}
                      onChange={handleBase64}
                      id=""
                      className="h-full w-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="h-full">
                    <img
                      src={!updateImage ? editNews?.image : updateImage}
                      className="w-full h-44"
                      alt=""
                    />
                  </div>
                </div>
                <p className="text-lg font-semibold">Image Caption:</p>
                <textarea
                  name=""
                  id=""
                  className={inputStyle}
                  placeholder="Image Caption Type Here..."
                  defaultValue={editNews?.img_cap}
                  {...register("img_cap", { required: true })}
                />
              </>
            )}
            {popUp === "custom_news" && (
              <textarea
                rows="10"
                type="text"
                name="news"
                placeholder="Full News Type here..."
                defaultValue={editNews.news}
                {...register("news", { required: true })}
                className={`${inputStyle} text-xl`}
              />
            )}
            {popUp === "custom_meta_desc" && (
              <textarea
                rows="4"
                type="text"
                name="meta_desc"
                placeholder="Simple Description Type here..."
                defaultValue={editNews.meta_desc}
                {...register("meta_desc", { required: true })}
                className={`${inputStyle} text-xl`}
              />
            )}

            <div className="flex justify-center">
              <button
                disabled={loader}
                type="submit"
                className="w-2/4 mb-5 mt-3 bg-primary text-light py-2 rounded-md"
              >
                {loader ? "Pls wait..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PopupLayout>
  );
};

export default Edit;
