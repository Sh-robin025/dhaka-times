import React from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const NavItem = ({ text, icon }) => (
  <li className="hover:text-primary font-bold py-1 px-3 cursor-pointer flex items-center gap-1">
    {icon}
    {text}
  </li>
);

const NavBar = () => {
  return (
    <nav>
      <ul className="flex gap-5 items-center mx-auto justify-center border border-light_gray sticky top-0">
        <Link to="/">
          <NavItem text="Home" icon={<IoHome />} />
        </Link>
        <Link to="/Bangladesh">
          <NavItem text="Bangladesh" />
        </Link>
        <Link to="/International">
          <NavItem text="International" />
        </Link>
        <Link to="/Sports">
          <NavItem text="Sports" />
        </Link>
        <Link to="/Opinion">
          <NavItem text="Opinion" />
        </Link>
        <Link to="/Business">
          <NavItem text="Business" />
        </Link>
        <Link to="/Youth">
          <NavItem text="Youth" />
        </Link>
        <Link to="/Entertainment">
          <NavItem text="Entertainment" />
        </Link>
        <Link to="/Lifestyle">
          <NavItem text="Lifestyle" />
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
