import React from "react";

function MenuLink(props) {
  return (
    <li className="nav-item me-1">
      <a
        className="nav-link fw-bolder text-white"
        aria-current="page"
        href={props.link}
      >
        {props.name}
      </a>
    </li>
  );
}

export default MenuLink;
