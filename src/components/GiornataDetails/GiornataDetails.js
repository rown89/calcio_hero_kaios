import React from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchFixtureById } from "../../Controllers";
import "./GiornataDetails.scss";

export const GiornataDetails = () => {
  let { id } = useParams();
  const [loader, setLoader] = React.useState(true);
  const [fixtures, setfixtures] = React.useState([]);

  React.useEffect(() => {
    fetchFixtureById(id).then(res => {
      console.log(res);
      setfixtures(res.data.api.fixtures[0]);
      setLoader(false);
    });
  }, []);

  const lineup = () => {
    if(fixtures.lineup){
      return (
        <>
          <>{fixtures.lineups[0].coach || "-"}</>
          <>{fixtures.lineups[0].formation || "-"}</>
          <>
            {fixtures.lineups[0].startXI.map(XI => {
              return <div>{XI.player}</div>;
            }) || "-"}
          </>
        </>
      );
    }
    return <div>dato non ancora disponibile</div>
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
        <div className="dateAndStatus">
          <p>{fixtures.event_date}</p>
          <p>{fixtures.status}</p>
        </div>
        <div className="teamData">
          <img className="teamLogo" src={fixtures.homeTeam.logo}></img>
          <p>{fixtures.homeTeam.team_name}</p>
          <div className="lineup">
            <p>Formazione:</p>
            {lineup()}
          </div>
        </div>
        <p>{fixtures.awayTeam.team_name}</p>
      </div>
    );
  }
};
