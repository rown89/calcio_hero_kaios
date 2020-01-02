import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchFixtureById } from "../../../Controllers";
import { parseISO } from "date-fns";
import "./GiornataDetails.scss";

export const GiornataDetails = () => {
  let { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [fixtures, setfixtures] = useState([]);
  const [SelectedTab, setSelectedTab] = useState("Statistics");

  const fetch = useCallback(() => {
    fetchFixtureById(id).then(res => {
      setfixtures(res.data.api.fixtures[0]);
      setLoader(false);
    });
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  function TabSwitcher() {
    switch (SelectedTab) {
      case "Statistics":
        return <Statistics />;
      case "Events":
        return <Events />;
      default:
        return <Statistics />;
    }
  }

  let Statistics = () => {
    if (fixtures.statistics) {
      const squadra = fixtures.statistics;
      let keySquadra = Object.keys(squadra);
      return (
        <>
          {keySquadra.map((item, i) => {
            return (
              <div className="stats" key={i}>
                <div className="stat">
                  <h5>{item}</h5>
                  <div className="data">
                    <h2>{squadra[item].home || "-"}</h2>
                    <h2>{squadra[item].away || "-"}</h2>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    } else
      return (
        <div className="stats">Al momento non è disponibile alcun dato.</div>
      );
  };

  let Events = () => {
    if (fixtures.events) {
      const eventi = fixtures.events;
      return (
        <>
          {eventi.map((items, i) => {
            return (
              <div key={i} className="eventsDetails">
                <div className="mainInfos">
                  <div className="squadraEventsInfo">
                    <img
                      src={
                        items.teamName === fixtures.homeTeam.team_name
                          ? fixtures.homeTeam.logo
                          : fixtures.awayTeam.logo
                      }
                    />
                    <h2>{items.teamName}</h2>
                  </div>
                  <b>{items.elapsed + '"'}</b>
                </div>
                <div>{items.player}</div>
                <i>{items.type + ': ' + items.detail}</i>
              </div>
            );
          })}
        </>
      );
    } else
      return (
        <div className="stats">Al momento non è disponibile alcun dato.</div>
      );
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
          <div className="playHour">
            {parseISO(fixtures.event_date).toString()}
          </div>
        </div>
        <div className="resume">
          <div className="team">
            <img className="teamLogo" src={fixtures.homeTeam.logo} alt="" />
            <p>{fixtures.homeTeam.team_name.toUpperCase()}</p>
            <div className="score">{fixtures.goalsHomeTeam}</div>
          </div>
          <div className="team">
            <img className="teamLogo" src={fixtures.awayTeam.logo} alt="" />
            <p>{fixtures.awayTeam.team_name.toUpperCase()}</p>
            <div className="score">{fixtures.goalsAwayTeam}</div>
          </div>
        </div>
        <div className="giornataDetailTabs">
          <button
            className={SelectedTab === "Statistics" ? "activeDetailsTab" : null}
            onClick={() => setSelectedTab("Statistics")}
          >
            Statistiche
          </button>
          <button
            className={SelectedTab === "Events" ? "activeDetailsTab" : null}
            onClick={() => setSelectedTab("Events")}
          >
            Eventi
          </button>
        </div>
        <TabSwitcher />
      </div>
    );
  }
};
