import React from "react";

export default function MobileMenu({ setToggle }) {
  return (
    <div className="mobile-menu-icon" onClick={setToggle}>
      <div className="menu-piece"></div>
      <div className="menu-piece"></div>
      <div className="menu-piece"></div>
    </div>
  );
}
