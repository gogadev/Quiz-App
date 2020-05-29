import React from "react";

import img from "../../assets/img.jpg";

import "./header.style.css";

const Header = () => {
  return (
    <header>
      <h1 className="title">Quiz Hour</h1>
      <div className="image">
        {" "}
        <img className="img" src={img} alt="" />
      </div>
    </header>
  );
};

export default Header;
