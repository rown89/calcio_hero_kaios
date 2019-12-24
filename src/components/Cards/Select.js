import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios';
import api from '../../Config/config';
import './Select.scss';

axios({
  "method":"GET",
  "url": api.URL_FIXURES_BY_LEAGUE + giornata,
  "headers":{
  "content-type":"application/octet-stream",
  "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
  "x-rapidapi-key": api.KEY
  }
})
.then((response)=>{

})
.catch((error)=>{
  console.log(error)
});

export const Select = () => {
  return (
    <div>
      Select
    </div>
  );
};