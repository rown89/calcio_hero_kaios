import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withFocus } from "react-keyboard-navigation";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  fetchCurrentRoundForALeague,
  fetchFixturesByLeagueId
} from "../../Controllers";
import { GiornataCards } from "..";
import "./Giornata.scss";
import "../SeasonPicker/SeasonPicker.scss";
export const Giornata = () => {
  const history = useHistory();
  const [Loading, setLoading] = useState(true);
  const [Season, setSeason] = useState([]);

  useEffect(() => {
    fetchCurrentRoundForALeague().then(res => {
      if (!localStorage.currentSeason || localStorage.currentSeason === null) {
        localStorage.setItem("currentSeason", res.data.api.fixtures[0]);
        callSeasonFixtures(localStorage.currentSeason);
      } else callSeasonFixtures(localStorage.currentSeason);
    });
  }, []);

  let callSeasonFixtures = season => {
    fetchFixturesByLeagueId(season).then(res => {
      setSeason(res.data.api.fixtures);
      setLoading(false);
    });
  };

  const SeasonPickerBtn = withFocus(({ forwardedRef, ...props }) => {
    return (
      <button
        className="btnPickSeason"
        ref={forwardedRef}
        {...props}
        onClick={() => history.push("/seasonPicker")}
      >
        <h2 className="p.PRI">Cambia</h2>
      </button>
    );
  });

  if (Loading) {
    return (
      <>
        <Loader type="Circles" color="#00BFFF" height={30} width={30} />
      </>
    );
  } else {
    return (
      <div className="giornateMain">
        <div className="pickedGiornata">
          <div className="giornata">
            Giornata: <h2>{localStorage.currentSeason.slice(-2).replace('_','')}</h2>
          </div>
          {<SeasonPickerBtn id="btnSeasonPicker" position={2} />}
        </div>
        <div position={2}>
          {Season.map((item, index) => {
            return <GiornataCards key={index} id={index} giornata={item} />;
          })}
        </div>
      </div>
    );
  }
};
