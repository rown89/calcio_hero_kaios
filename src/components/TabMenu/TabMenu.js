import React, { useState, useEffect } from "react";
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import { withFocus } from "react-keyboard-navigation";
import "./TabMenu.scss";

const sections = [
  {
    name: "Squadre",
    to: "/squadre"
  },
  {
    name: "Giornate",
    to: "/"
  },
  {
    name: "Oggi",
    to: "/oggi"
  }
];

export const TabMenu = () => {
  const [counter, SetCounter] = useState(0);
  const [Loaded, SetLoaded] = useState(false);

  let Nav = item => {
    const { section } = item;
    const NavFocus = withFocus(({ forwardedRef, ...props }) => {
      return (
        <NavLink
          ref={forwardedRef}
          {...props}
          className="tab"
          activeClassName="chosen"
          to={section.to}
          exact={true}
        >
          {section.name}
        </NavLink>
      );
    });
    return <NavFocus id={section.name} position={0} />;
  };

  return (
    <div className="tabs">
      {sections.map((item, i) => {
        return <Nav key={i} section={item} />;
      })}
    </div>
  );
};
