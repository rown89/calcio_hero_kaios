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

  let StatGenerator = team => {
    const { squadra } = team;
    if (fixtures.statistics) {
      var keySquadra = Object.keys(squadra);
      return (
        <>
          <div className="statSection">STATISTICS</div>
          {keySquadra.map((item, i) => {
            return (
              <div className="stats" key={i}>
                <div className="stat">
                  <p>{item}</p>
                  <div className="data">
                    <div>{squadra[item].home || "-"}</div>
                    <div>{squadra[item].away || "-"}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    } else return <div className="stats">-</div>;
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
        <div className="status">
          <p>{fixtures.status}</p>
          <p style={{ fontSize: 11 }}>{fixtures.venue}</p>
          <p
            style={{
              margin: "auto",
              maxWidth: 200,
              textAlign: "center",
              fontSize: 10
            }}
          >
            {parseISO(fixtures.event_date).toString()}
          </p>
        </div>
        <div className="resume">
          <div className="team">
            <img className="teamLogo" src={fixtures.homeTeam.logo} alt=""/>
            <p>{fixtures.homeTeam.team_name.toUpperCase()}</p>
            <div className="score">{fixtures.goalsHomeTeam}</div>
          </div>
          <div className="team">
            <img className="teamLogo" src={fixtures.awayTeam.logo} alt=""/>
            <p>{fixtures.awayTeam.team_name.toUpperCase()}</p>
            <div className="score">{fixtures.goalsAwayTeam}</div>
          </div>
        </div>
        <StatGenerator squadra={fixtures.statistics} />
      </div>
    );
  }
};
