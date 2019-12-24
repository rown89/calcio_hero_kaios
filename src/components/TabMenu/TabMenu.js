import React from 'react'
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import { withFocus } from 'react-keyboard-navigation';
import './TabMenu.scss';

export const TabMenu = () => {
  let navWithFocus = (to, text) => {
    const NavFocus = withFocus(
      ({ forwardedRef, ...props }) => {
        return (
          <NavLink ref={forwardedRef} {...props} className="tab" activeClassName="chosen" to={to} exact={true}>
            {text}
          </NavLink>
        );
      }
    );
    return <NavFocus position={0} id="tab" defaultActive />
  }

  return (
    <div className="tabs">
      {navWithFocus("/squadre", "Squadre")}
      {navWithFocus("/", "Giornata")}
      {navWithFocus("/oggi", "Oggi")}
    </div>
  );
};