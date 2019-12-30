import React, { useState, useEffect } from "react";
import { StatisticheSquadra } from '../index'
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchTeamById } from "../../Controllers";
import "./Squadra.scss";

export const Squadra = () => {
  let { id } = useParams();
  const [Team, SetTeam] = useState([]);
  const [Statistics, SetStatistics] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchTeamById(id).then(res => {
      SetTeam(res.data.api.teams[0]);
      setLoader(false);
    });
  }, []);

  if (loader) {
    return (
      <>
        <Loader type="Circles" color="#00BFFF" height={30} width={30} />
      </>
    );
  } else {
    return (
      <div className="squadra">
        <div className="clubInfo">
          <img className="logo" src={Team.logo} />
          <h2>{Team.name}</h2>
          <p style={{ color: "#bbbbbb", fontSize: 14 }}>{Team.venue_name}</p>
        </div>
        <StatisticheSquadra squadra={Team.team_id} logo={Team.logo} />
      </div>
    );
  }
};
