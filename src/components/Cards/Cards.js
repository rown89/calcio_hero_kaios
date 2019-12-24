import React, { useEffect, useRef, useCallback } from 'react';
import { withFocus } from 'react-keyboard-navigation';
import { useHistory } from 'react-router-dom';
import './Cards.scss';

export const Cards = ({ giornata, index, setFocus, focus }) => {
  let history = useHistory();
  const ref = useRef(null);

  useEffect(() => {
    if (focus) {
      // Move element into view when it is focused
      ref.current.focus();
    }
  }, [focus]);

  const handleSelect = useCallback((fixture_id) => {
    history.push("/giornata-details/" + fixture_id);
    // setting focus to that element when it is selected
    setFocus(index);
  }, [giornata, index, setFocus]);
  const CardsWithFocus = withFocus(
    ({ forwardedRef, ...props }) => {
      return (
        <div ref={forwardedRef} {...props} className="card" key={index.index} onClick={() => handleSelect(giornata.fixture_id)} onKeyPress={() => handleSelect(giornata.fixture_id)}>
          <div className="squad">
            <div className="clubname">
              <img src={giornata.homeTeam.logo} alt="" className="logo"></img>
              <h2>{giornata.homeTeam.team_name}</h2>
            </div>
            <div className="score">
              {giornata.goalsHomeTeam || '-'}
            </div>
          </div>
          <div className="squad">
            <img src={giornata.awayTeam.logo} alt="" className="logo"></img>
            <div className="clubname">
              <h2>{giornata.awayTeam.team_name}</h2>
            </div>
            <div className="score">
              {giornata.goalsAwayTeam || '-'}
            </div>
          </div>
        </div>
      );
    });
  return <CardsWithFocus id="input" position={0} defaultActive />
};