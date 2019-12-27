import React, { useEffect, useState } from "react";
import { ClassificaCards } from "..";
import { fetchStandings } from "../../Controllers";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Classifica.scss";

export const Classifica = () => {
  let [Loading, setLoading] = useState(true);
  let [Squadre, SetSquadre] = useState([]);
  
  useEffect(() => {
    fetchStandings().then(res => {
      SetSquadre(res.data.api.standings);
      setLoading(false);
    });
  }, []);

  if (Loading) {
    return (
      <>
        <Loader type="Circles" color="#00BFFF" height={30} width={30} />
      </>
    );
  } else {
    return (
      <div className="classifica">
        <ClassificaCards classifica={Squadre} />
      </div>
    );
  }
};
