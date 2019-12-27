import React from "react";
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import { withFocus } from "react-keyboard-navigation";
import "./TabMenu.scss";

const sections = [
  {
    name: "Classifica",
    to: "/classifica"
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
