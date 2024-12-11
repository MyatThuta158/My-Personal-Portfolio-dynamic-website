import React from "react";
import MenuLink from "./MenuLink";

function HeaderNavigation() {
  const menuArray = [
    ["About", "#about"],
    ["What I Do", "#do"],
    ["Skills", "#skills"],
    ["Education & Experiences", "#education"],
    ["Projects", "#projects"],
    ["Contact", "#contact"],
  ];

  return (
    <nav
      className="navbar navbar-expand-lg navbar-warning py-4"
      style={{
        background: "black",
        boxShadow: "0 4px 15px -1px rgba(255, 255, 255, 0.4)",
      }}
    >
      <div className="navbar-brand text-white">
        <span className="roboto-medium fs-4 text-uppercase ms-5" id="logo">
          Myat Thuta
        </span>
      </div>
      <button
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="justify-content-end collapse navbar-collapse me-4"
        id="menu"
      >
        <ul className="navbar-nav justify-content-end">
          {menuArray.map(([value, link], i) => {
            return <MenuLink key={i} name={value} link={link} />;
          })}
        </ul>
      </div>
    </nav>
  );
}

export default HeaderNavigation;
