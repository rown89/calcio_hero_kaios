import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllSeasons } from "../../../Controllers";
import { withFocus } from "react-keyboard-navigation";
import "./SeasonPicker.scss";

export const SeasonPicker = () => {
  const history = useHistory();
  const [AllSeason, setAllSeason] = useState([]);

  useEffect(() => {
    fetchAllSeasons().then(res => {
      setAllSeason(res.data.api.fixtures);
    });
  }, []);

  let pickedSeason = season => {
    localStorage.setItem("currentSeason", season);
    history.push("/");
  };

  let Nav = (item) => {
    const { season } = item;
    const SeasonsList = withFocus(({ forwardedRef, ...props }) => {
      return (
        <button
          ref={forwardedRef}
          {...props}
          className="btnSeasonList"
          onClick={() => pickedSeason(season)}
        >
          <h2>{"Giornata " + season.slice(-2).replace('_','')}</h2>
        </button>
      );
    });
    return <SeasonsList id={season} position={1} />;
  };

  return (
    <div className="seasonPickerContainer">
      <div className="info">
        Seleziona una giornata
      </div>
      {AllSeason.map((item, i) => {
        return <Nav key={i} season={item} />;
      })}
    </div>
  );
};
