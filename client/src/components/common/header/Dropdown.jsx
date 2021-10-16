import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../../services/AuthService";
import { authenticate } from "../../../redux/slices/userSlice";
import { FiLogOut } from "react-icons/fi";

const Dropdown = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const logout = async () => {
    await handleLogout();
    dispatch(authenticate(null));
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex gap-3 items-center font-medium bg-primary text-light rounded-full pl-3">
          {user.name}
          <Menu.Button className="h-10 focus:outline-none">
            <img
              src="https://miro.medium.com/max/600/1*PiHoomzwh9Plr9_GA26JcA.png"
              alt=""
              className="rounded-full h-full"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-100"
          enterFrom="transform opacity-100 scale-50"
          enterTo="transform opacity-100 scale-90"
          leave="transition ease-out duration-200"
          leaveFrom="transform opacity-100 scale-50"
          leaveTo="transform opacity-0 scale-50"
        >
          <Menu.Items className="absolute right-0 mt-2 origin-top-right z-50 bg-gray rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none">
            <div className=" ">
              <Menu.Item
                as="div"
                className=" text-light font-medium tracking-widest py-1 bg-gray rounded-t-md text-center text-xl"
              >
                Profile
              </Menu.Item>
            </div>
            <div>
              <Menu.Item as="div" className=" text-light py-1 bg-gray px-3 text-center">
                {user.email}
              </Menu.Item>
            </div>
            <div>
              <Menu.Item
                onClick={logout}
                as="button"
                className="flex items-center justify-center gap-3 text-light w-full rounded-b-md py-1 px-3 text-center bg-secondary"
              >
                logout <FiLogOut />
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
