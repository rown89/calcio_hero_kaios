import React, { useState, useEffect, useCallback } from "react";
import { StatisticheSquadra } from '../../index'
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchTeamById } from "../../../Controllers";
import "./SquadraDetails.scss";

export const SquadraDetails = () => {
  let { id } = useParams();
  const [Team, SetTeam] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetch = useCallback(() => {
    fetchTeamById(id).then(res => {
      SetTeam(res.data.api.teams[0]);
      setLoader(false);
    });
  }, [id]) 

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loader) {
    return (
      <>
        <Loader type="Circles" color="#00BFFF" height={30} width={30} />
      </>
    );
  } else {
    return (
      <div id="squadra">
        <div className="clubInfo">
          <img className="logo" src={Team.logo} alt="team-logo" />
          <h2>{Team.name}</h2>
        </div>
        <StatisticheSquadra squadra={Team.team_id} logo={Team.logo} />
      </div>
    );
  }
};
