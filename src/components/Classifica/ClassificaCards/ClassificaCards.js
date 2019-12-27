import React, { useCallback } from "react";
import { withFocus } from "react-keyboard-navigation";
import "./ClassificaCards.scss";

export const ClassificaCards = (classifica) => {
  const squadre = classifica.classifica[0];

  let Card = (stand) => {
    const CardFocus = withFocus(({ forwardedRef, ...props }) => {
      return (
        <div
          className="cardf"
          ref={forwardedRef}
          {...props}
        > 
          <div className="squadra">
            <img src={stand.stand.logo} alt="logo-squadra" />
            <h2>{stand.stand.teamName}</h2>
          </div>
          <div className="punti">
            <h2>{stand.stand.points}</h2>p
          </div>
        </div>
      );
    });
    return <CardFocus id={stand.stand.teamName} position={1} />;
  };

  return (
    <>
      {squadre.map((item, i) => {
        return (
            <Card key={i} stand={item} />
        );
      })}
    </>
  );
};
