import React, { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import {
  TabMenu,
  Giocatori,
  Giornata,
  SeasonPicker,
  GiornataDetails,
  ClassificaSquadre,
  SquadraDetails,
  Softkey
} from "./Components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import { fetchLeagueByYear } from "./Controllers";
import "./App.scss";

export default function App() {
  const [Loading, setLoading] = useState(true);
  //const [League, setLeague] = useState([]);

  useEffect(() => {
    if (navigator.onLine) {
      /*fetchLeagueByYear().then(res => {
        setLeague(res.data.api.leagues[0]);
        setLoading(false);
      });*/
      setLoading(false);
    }
  }, []);

  if (Loading) {
    return (
      <>
        <div className="loader">
          {navigator.online && (
            <Loader type="Circles" color="#00BFFF" height={30} width={30} />
          )}
        </div>
        <div>
          {!navigator.online && (
            <div className="checkInternet">
              <div className="msg">
                <b>Connessione...</b>
              </div>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <HashRouter>
        <header>
          <div className="title">
            <img
              className="img"
              alt="logo"
              src={"https://image.flaticon.com/icons/png/512/123/123443.png"}
            />
            <h5>CALCIO HERO</h5>
          </div>
          {/*<div className="league">
            <img
              alt="logo-league"
              className="logo"
              src={League.logo || ""}
            ></img>
            <div className="p.PRI">{League.name}</div>
            <div className="p.SEC">{League.season}</div>
          </div>*/}
        </header>
        <TabMenu />
        <Route exact path="/" component={Giornata} />
        <Route exact path="/classificaSquadre" component={ClassificaSquadre} />
        <Route exact path="/squadra-details/:id" component={SquadraDetails} />
        <Route exact path="/seasonPicker" component={SeasonPicker} />
        <Route exact path="/giocatori" component={Giocatori} />
        <Route exact path="/giornata-details/:id" component={GiornataDetails} />
        <Softkey center={"Insert"} />
      </HashRouter>
    );
  }
}
