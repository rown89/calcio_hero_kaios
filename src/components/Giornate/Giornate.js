import React, { useState, useEffect } from "react";
import "./Giornate.scss";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  fetchCurrentRoundForALeague,
  fetchFixturesByLeagueId,
  fetchAllSeasons
} from "../../Controllers/";
import Modal from "react-modal";
import { Cards } from "../../components";

//import useRovingFocus from "../../Hooks/UseRoveFocus";

export const Giornate = () => {
  Modal.setAppElement("#root");
  const [Loading, setLoading] = useState(true);
  const [CurrentSeason, setCurrentSeason] = useState([]);
  const [ChoosenSeason, setChoosenSeason] = useState([]);
  const [AllSeason, setAllSeason] = useState([]);
  const [SeasonListModal, setSeasonListModal] = useState(false);
  //const [focus, setFocus] = useRovingFocus(ChoosenSeason.length);

  useEffect(() => {
    fetchCurrentRoundForALeague().then(res => {
      setCurrentSeason(res.data.api.fixtures[0]);
      callSeasonFixtures(res.data.api.fixtures[0]);
    });
  }, []);

  //Metodo custom per chiamare una giornata specifica.
  let callSeasonFixtures = season => {
    if (season !== null) {
      fetchFixturesByLeagueId(season).then(res => {
        setChoosenSeason(res.data.api.fixtures);
        setLoading(false);
      });
    } else return;
  };

  let openModal = () => {
    fetchAllSeasons().then(res => {
      setAllSeason(res.data.api.fixtures);
      setSeasonListModal(true);
    });
  };

  let closeModal = () => {
    setSeasonListModal(false);
  };

  let pickedSeason = season => {
    closeModal();
    callSeasonFixtures(season);
    setCurrentSeason(season);
  };

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
            Giornata: <h2>{CurrentSeason.slice(-2)}</h2>
          </div>
          <button className="btnPickSeason" onClick={openModal}>
            <div className="p.PRI">Seleziona </div>
          </button>
          <Modal
            isOpen={SeasonListModal}
            onRequestClose={closeModal}
            style={SeasonListModalStyle}
          >
            <>
              <div className="btnContainer">
                <button className="btnBack" onClick={closeModal}>Indietro</button>
              </div>
              {AllSeason.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="btnSeasonList"
                    onClick={() => pickedSeason(item)}
                  >
                    <h2>{"Giornata " + item.slice(-2)}</h2>
                  </div>
                );
              })}
              <div className="btnContainer">
                <button className="btnBack" onClick={closeModal}>Indietro</button>
              </div>
            </>
          </Modal>
        </div>
        {ChoosenSeason.map((item, index) => {
          return (
            <Cards
              key={index}
              index={index}
              // setFocus={setFocus}
              // focus={focus === index}
              giornata={item}
            />
          );
        })}
      </div>
    );
  }
};

const SeasonListModalStyle = {
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0 10px 0 10px",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 0,
    borderRadius: 0,
    background: "white",
    boxSizing: "border-box"
  },
  overlay: {
    background: "none"
  }
};
