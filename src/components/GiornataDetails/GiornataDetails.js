import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchFixtureById } from "../../Controllers";
import { parseISO } from "date-fns";
import "./GiornataDetails.scss";

export const GiornataDetails = () => {
  let { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [fixtures, setfixtures] = useState([]);

  useEffect(() => {
    fetchFixtureById(id).then(res => {
      setfixtures(res.data.api.fixtures[0]);
      setLoader(false);
    });
  }, []);

  const Lineup = () => {
    if (fixtures.lineups) {
      return (
        <>
          <>{fixtures.lineups[0].coach || "-"}</>
          <>{fixtures.lineups[0].formation || "-"}</>
          <>
            {fixtures.lineups[0].startXI.map(XI => {
              return <div>{XI.player}</div>;
            }) || "-"}
          </>
        </>
      );
    }
    return <div>dato non ancora disponibile</div>;
  };

  if (loader) {
    return (
      <>
        <Loader type="Circles" color="#00BFFF" height={30} width={30} />
      </>
    );
  } else {
    return (
      <div className="giornataDetailMain">
        <div className="resume">
          <div className="team">
            <img className="teamLogo" src={fixtures.homeTeam.logo}></img>
            <p>{fixtures.homeTeam.team_name.toUpperCase()}</p>
            <div className="score">
            {fixtures.goalsHomeTeam}
            </div>
          </div>
          <div className="team">
            <img className="teamLogo" src={fixtures.awayTeam.logo}></img>
            <p>{fixtures.awayTeam.team_name.toUpperCase()}</p>
            <div className="score">
              {fixtures.goalsAwayTeam}
            </div>
          </div>
        </div>

        <div className="status">
          <p>{fixtures.status}</p>
          <p>{fixtures.venue}</p>
        </div>
        <div className="date">
          <p>{parseISO(fixtures.event_date).toString()}</p>
        </div>

        <div className="lineups">
          <p>Formazione:</p>
          
        </div>
      </div>
    );
  }
};
