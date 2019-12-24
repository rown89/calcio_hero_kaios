import React from 'react'
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import './TabMenu.scss';

export const TabMenu = () => {
  return (
    <div className="tabs">
      <NavLink className="tab" activeClassName="chosen" to={"/squadre"} exact={true}>
        Squadre
      </NavLink>
      <NavLink className="tab" activeClassName="chosen" to={"/"} exact={true}>
        Giornata
      </NavLink>
      <NavLink className="tab" activeClassName="chosen" to={"/oggi"} exact={true}>
        Oggi
      </NavLink>
    </div>
  );
};