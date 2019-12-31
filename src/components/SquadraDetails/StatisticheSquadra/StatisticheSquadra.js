import React, { useState, useEffect } from "react";
import { withFocus } from "react-keyboard-navigation";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchTeamStatistics } from "../../../Controllers";
import "../SquadraDetails.scss";

export const StatisticheSquadra = (team_id, team_logo) => {
  const [loader, setLoader] = useState(true);
  const [Statistics, SetStatistics] = useState([]);
  const {squadra} = team_id;
  const {logo} = team_logo;

  useEffect(() => {
    fetchTeamStatistics(squadra).then(res => {
      SetStatistics(res.data.api.statistics);
      setLoader(false);
    });
  }, []);
  
  const MatchsPlayed = data => {
    const {title, stat, id} = data
    const CardsWithFocus = withFocus(({ forwardedRef, ...props }) => {
      return(
        <div className="clubStat" ref={forwardedRef} {...props}>
          <button className="btnStat">
            <p>{title}</p>
            <div className="container">
              <div className="stat">
                <div>totali</div>
                <h2>{stat.total}</h2>
              </div>
              <div className="stat">
                <div>casa</div>
                <h2>{stat.home}</h2>
              </div>
              <div className="stat">
                <div>trasferte</div>
                <h2>{stat.away}</h2>
              </div>
            </div>
          </button>
        </div>
      );
    });

    return <CardsWithFocus id={id} />;
  }

  if (loader) {
    return (
      <>
        <Loader type="Circles" color="#00BFFF" height={30} width={30} />
      </>
    );
  } else {
    return (
      <>
        <MatchsPlayed
          key={1}
          id={"1"}
          title={"PARTITE GIOCATE"}
          stat={Statistics.matchs.matchsPlayed}
        />
        <MatchsPlayed
          key={2}
          id={"2"}
          title={"PARTITE VINTE"}
          stat={Statistics.matchs.wins}
        />
        <MatchsPlayed
          key={3}
          id={"3"}
          title={"PARTITE PAREGGIATE"}
          stat={Statistics.matchs.draws}
        />
        <MatchsPlayed
          key={4}
          id={"4"}
          title={"PARTITE PERSE"}
          stat={Statistics.matchs.draws}
        />
      </>
    );
  }
};
