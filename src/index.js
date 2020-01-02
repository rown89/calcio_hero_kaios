import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import { NavigationProvider } from "react-keyboard-navigation";

ReactDOM.render(
  <NavigationProvider>
    <App />
  </NavigationProvider>,
  document.getElementById("root")
);

document.addEventListener("keydown", handleArrow);

function handleArrow(event) {
  switch (event.key) {
    case 'ArrowLeft':
      console.log('left');
      break;
    case 'ArrowRight':
      console.log('right');
      break;
    default:
      return;
  }
  let activeElement = document.activeElement;
  activeElement.scrollIntoView(true);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
