import React from "react";
import { useHistory } from "react-router-dom";
import { withFocus } from "react-keyboard-navigation";
import "./ClassificaCards.scss";

export const ClassificaCards = classifica => {
  const history = useHistory();
  const squadre = classifica.classifica[0];

  let Card = squadra => {
    const { data } = squadra;
    const CardFocus = withFocus(({ forwardedRef, ...props }) => {
      return (
        <button
          className="cardf"
          ref={forwardedRef}
          {...props}
          onClick={() => history.push("squadra-details/" + data.team_id)}
        >
          <div className="squadra">
            <img src={data.logo} alt="logo-squadra" />
            <h2>{data.teamName}</h2>
          </div>
          <div className="punti">
            <h2 className="p">{data.points}</h2>
          </div>
        </button>
      );
    });
    return <CardFocus id={data.teamName} position={1} />;
  };

  return (
    <>
      {squadre.map((item, i) => {
        return <Card key={i} data={item} />;
      })}
    </>
  );
};
