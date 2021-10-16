import React from "react";
import { FaFileImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { set_image, set_img_cap } from "../../../redux/slices/newsSlice";

const SecondStep = () => {
  const formData = useSelector(state => state.news.create_news);
  const dispatch = useDispatch();
  const { image, img_cap } = formData;

  const photoUpload = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== "") {
      reader.onloadend = () => {
        dispatch(set_image(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-3/4">
      <div className="w-full rounded-lg overflow-hidden flex justify-around">
        {/*  */}
        {image ? (
          <div className="flex flex-col justify-center gap-5 h-44 ">
            <div className="relative py-1 border-dashed border-2 border-primary bg-light_gray flex items-center justify-center rounded-md">
              <div className="absolute">
                <span className="text-gray text-sm font-semibold">Change Image</span>
              </div>
              <input
                onChange={photoUpload}
                type="file"
                className="h-full w-full opacity-0"
                name="newsImage"
              />
            </div>

            <button
              onClick={() => dispatch(set_image(""))}
              className="border py-2 px-4 rounded-md font-semibold text-sm bg-primary text-light"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="relative h-28 w-full rounded-lg border-dashed border-2 border-primary bg-light_gray flex justify-center items-center">
            <div className="absolute">
              <div className="flex flex-col items-center">
                <FaFileImage className="text-3xl text-secondary font-semibold" />
                <span className="block text-gray font-normal">Attach Image here</span>
              </div>
            </div>
            <input
              onChange={photoUpload}
              type="file"
              className="h-full w-full opacity-0 cursor-pointer"
              name="image"
            />
          </div>
        )}
        <div className="h-full">
          {image !== "" && <img src={image} className="w-full h-44" alt="" />}
        </div>
      </div>

      <div>
        <textarea
          onChange={e => dispatch(set_img_cap(e.target.value))}
          defaultValue={img_cap}
          name=""
          id=""
          className="w-full py-1 px-3 text-lg border outline-none focus:border-primary rounded-md"
          placeholder="Image Caption Type Here..."
        />
      </div>
    </div>
  );
};

export default SecondStep;
