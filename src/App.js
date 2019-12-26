import React, { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import {
  TabMenu,
  Oggi,
  Giornata,
  SeasonPicker,
  GiornataDetails,
  Squadre,
  Softkey
} from "./components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchLeagueByYear } from "./Controllers";
import "./App.scss";

export default function App() {
  const [Loading, setLoading] = useState([]);
  const [League, setLeague] = useState([]);

  useEffect(() => {
    fetchLeagueByYear().then(res => {
      setLeague(res.data.api.leagues[0]);
      setLoading(false);
    });
  }, []);

  let RenderLeague = () => {
    if (Loading) {
      return (
        <div className="loader">
          <Loader type="Circles" color="#00BFFF" height={30} width={30} />
        </div>
      );
    } else {
      return (
        <div className="league">
          <img alt="logo-league" className="logo" src={League.logo || ''}></img>
          <div className="p.PRI">{League.name}</div>
          <div className="p.SEC">{League.season}</div>
        </div>
      );
    };
  };

  return (
    <HashRouter>
      <header>
        <div className="title">
          <img
            className="img"
            src={"https://image.flaticon.com/icons/png/512/123/123443.png"}
          />
          <h5>CALCIO HERO</h5>
        </div>
        <RenderLeague/>
      </header>
      <TabMenu />
      <Route exact path="/squadre" component={Squadre} />
      <Route exact path="/" component={Giornata} />
      <Route exact path="/seasonPicker" component={SeasonPicker} />
      <Route exact path="/oggi" component={Oggi} />
      <Route exact path="/giornata-details/:id" component={GiornataDetails} />
      <Softkey center={"Insert"} />
    </HashRouter>
  );
}
