import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { withFocus } from "react-keyboard-navigation";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchFixtureById } from "../../../Controllers";
import { parseISO } from "date-fns";
import "./GiornataDetails.scss";

export const GiornataDetails = () => {
  let { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [fixtures, setfixtures] = useState([]);
  const [SelectedTab, setSelectedTab] = useState("Statistiche");

  const fetch = useCallback(() => {
    fetchFixtureById(id).then(res => {
      setfixtures(res.data.api.fixtures[0]);
      setLoader(false);
    });
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  let TabButton = tab => {
    const NavFocus = withFocus(({ forwardedRef, ...props }) => {
      return (
        <button
          ref={forwardedRef}
          {...props}
          className={SelectedTab === tab.name ? "activeDetailsTab" : null}
          onClick={() => setSelectedTab(tab.name)}
        >
          {tab.name}
        </button>
      );
    });
    return <NavFocus id={"giornataDetails" + tab.name} />;
  };

  let TabSwitcher = () => {
    switch (SelectedTab) {
      case "Statistiche":
        return <Statistics />;
      case "Eventi":
        return <Events />;
      case "Formazioni":
        return <Lineups />;
      default:
        return <Statistics />;
    }
  };

  let Statistics = () => {
    if (fixtures.statistics) {
      const squadra = fixtures.statistics;
      const keySquadra = Object.keys(squadra);
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
                      alt="logo-events"
                    />
                    <h2>{items.teamName}</h2>
                  </div>
                  <b>{items.elapsed + '"'}</b>
                </div>
                <div>{items.player}</div>
                <i>{items.type + ": " + items.detail}</i>
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

  let Lineups = () => {
    if (fixtures.lineups) {
      const lineups = fixtures.lineups;
      const KeyLineups = Object.keys(fixtures.lineups);
      return (
        <>
          {KeyLineups.map((item, i) => {
            return (
              <div className="lineups" key={i}>
                <div className="lineupsLogoName">
                  <div className="lineupMainInfos">
                    <img
                      src={
                        item === fixtures.homeTeam.team_name
                          ? fixtures.homeTeam.logo
                          : fixtures.awayTeam.logo
                      }
                      alt="logo-lineup"
                    />
                    <h5>{item}</h5>
                  </div>
                  <div style={{marginLeft: 40}}>
                    <h5>{lineups[item].coach}</h5>
                    <h5>{lineups[item].formation}</h5>
                  </div>
                </div>
                <div>{lineups[item].startXI.map((item, i) => {
                  return(
                    <div className="lineupSquadra" key={i}>
                      <div className="playerNumber">{item.number}</div>
                      <div className="playerName">{item.player}</div>
                    </div>
                  )
                })}</div>
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
          <TabButton name={"Statistiche"} />
          <TabButton name={"Eventi"} />
          <TabButton name={"Formazioni"} />
        </div>
        <TabSwitcher />
      </div>
    );
  }
};
