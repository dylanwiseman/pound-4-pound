import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { HashRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCGzC6EGPmje0RJmW3601tteIEHTOQ3mok",
  authDomain: "pound4pound---dev.firebaseapp.com",
  projectId: "pound4pound---dev",
  storageBucket: "pound4pound---dev.appspot.com",
  messagingSenderId: "69193129175",
  appId: "1:69193129175:web:989cdcb13e755359ba6492",
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
