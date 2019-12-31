import React, { useState, useEffect } from "react";
import { fetcTopPlayers } from "../../Controllers";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Giocatori.scss";

export const Giocatori = () => {
  const [loading, Setloading] = useState(true);
  const [Players, SetPlayers] = useState([]);

  useEffect(() => {
    fetcTopPlayers().then(res => {
      SetPlayers(res.data.api.topscorers);
      Setloading(false);
    });
  }, []);

  if (loading) {
    return <Loader type="Circles" color="#00BFFF" height={30} width={30} />;
  } else {
    return (
      <div className="Giocatori">
        {Players.map((item, i) => {
          return (
            <div className="giocatore" key={i}>
              <div className="mainInfo">
                <div className="name">
                  <h2>{item.player_name}</h2>
                  </div>
                <div className="squadra">{item.team_name}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
