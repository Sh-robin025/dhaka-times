import React, { useState } from "react";
import FirstStep from "./stepForm/FirstStep";
import SecondStep from "./stepForm/SecondStep";
import ThirdStep from "./stepForm/ThirdStep";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineFileDone } from "react-icons/ai";
import FinalStep from "./stepForm/FinalStep";
import {
  set_author,
  set_category,
  set_headline,
  set_image,
  set_img_cap,
  set_meta_desc,
  set_news,
} from "../../redux/slices/newsSlice";
import { addNews } from "../../services/NewsService";
import Spinner from "../common/Spinner";
import { MdNoteAdd } from "react-icons/md";
import { toast } from "react-toastify";

const StepCount = ({ count, step, icon }) => (
  <div className="flex items-center relative">
    <div
      className={`flex items-center justify-center text-2xl rounded-full h-12 w-12 py-3 border-2 border-primary ${
        step === count && "bg-primary text-light"
      }`}
    >
      {icon ? icon : count}
    </div>
  </div>
);

const NewsForm = () => {
  const author = useSelector(state => state.user.user?.name);
  const formData = useSelector(state => state.news.create_news);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const pathStyle = "flex-auto border-t-2 transition duration-500 ease-in-out border-primary";

  const handlePublish = async e => {
    e.preventDefault();
    dispatch(set_author(author));
    if (step === 4) {
      const res = await addNews(formData);
      console.log(res);
      if (res.status === 201) {
        dispatch(set_headline(""));
        dispatch(set_category(""));
        dispatch(set_meta_desc(""));
        dispatch(set_image(""));
        dispatch(set_img_cap(""));
        dispatch(set_news(""));
        toast.success(res.message);
        setStep(step + 1);
      } else {
        toast.error(res.message);
        setStep(step - 1);
      }
    }
  };

  return (
    <div className="p-5">
      <div className="mx-4 p-4">
        <div className="flex items-center">
          {/*  */}
          <StepCount count={1} step={step} label="Headline & Simple Desc." />
          <div className={pathStyle} />

          <StepCount count={2} step={step} />
          <div className={pathStyle} />

          <StepCount count={3} step={step} />
          <div className={pathStyle} />

          <StepCount icon={<AiOutlineFileDone />} count={5} step={step} />
        </div>
      </div>
      <form action="" onSubmit={handlePublish}>
        <div className="p-5 text-center h-full flex items-center justify-center">
          {step <= 1 && <FirstStep />}
          {step === 2 && <SecondStep />}
          {step === 3 && <ThirdStep />}
          {step === 4 && <Spinner />}
          {step === 5 && <FinalStep />}
        </div>
        <div className={`mt-8 p-4 ${step === 4 && "hidden"}`}>
          <div className="flex p-2 mt-4">
            {step === 2 || step === 3 ? (
              <button
                className="bg-gray text-light_gray active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            ) : (
              ""
            )}
            <div className="flex-auto flex flex-row-reverse">
              {step <= 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="mx-3 bg-primary text-light font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-secondary outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  disabled={
                    (step === 1 && formData.headline === "") ||
                    (step === 1 && formData.meta_desc === "") ||
                    (step === 1 && formData.category === "") ||
                    (step === 2 && formData.img_cap === "") ||
                    (step === 2 && formData.image === "") ||
                    (step === 3 && formData.news === "")
                  }
                >
                  {step === 3 ? "Publish" : "next"}
                </button>
              ) : (
                <button
                  onClick={() => setStep(1)}
                  className="bg-primary text-light py-1 px-4 uppercase rounded-md flex items-center gap-3"
                >
                  <MdNoteAdd /> add another one
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
