import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_category, set_headline, set_meta_desc } from "../../../redux/slices/newsSlice";

const categories = [
  "Bangladesh",
  "International",
  "Sports",
  "Lifestyle",
  "Business",
  "Youth",
  "Entertainment",
  "Opinion",
];

const inputStyle = "border py-1 px-3 rounded-md outline-none focus:border-primary";

const FirstStep = () => {
  const formData = useSelector(state => state.news.create_news);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5 w-3/4">
      <textarea
        onChange={e => dispatch(set_headline(e.target.value))}
        type="text"
        name="headline"
        required
        defaultValue={formData.headline}
        placeholder="Headline Type here..."
        className={`${inputStyle} text-3xl`}
      />
      <textarea
        rows="4"
        type="text"
        name="meta_desc"
        placeholder="Simple Description Type here..."
        defaultValue={formData.meta_desc}
        onChange={e => dispatch(set_meta_desc(e.target.value))}
        className={`${inputStyle} text-xl`}
      />
      <Menu as="div" className="relative border-2 border-dotted border-primary rounded-md">
        <Menu.Button className="w-full py-2 font-semibold">
          {formData.category ? formData.category : "* Click Here to Select Category"}
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
          <Menu.Items as="div" className="w-full absolute right-0 origin-top z-50 shadow-lg">
            <ul className="bg-primary grid grid-cols-5 gap-4 p-2 rounded-md text-light">
              {categories.map(category => (
                <li
                  key={category}
                  className="bg-secondary text-white px-3 py-1 cursor-pointer rounded-lg"
                  onClick={() => dispatch(set_category(category))}
                >
                  {category}
                </li>
              ))}
            </ul>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default FirstStep;
