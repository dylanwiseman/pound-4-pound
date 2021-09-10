import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";
import store from "./redux/store";

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
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
