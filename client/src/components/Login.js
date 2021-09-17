// import React, { useState } from "react";
import PropTypes from "prop-types";
import "../login-signup.css";
// import axios from "axios";
// import { withRouter, useHistory } from "react-router";
// import { useSelector, useDispatch } from "react-redux";

export default function Login({
  setToken,
  setUserName,
  loginUser,
  setPassword,
  username,
  password,
}) {
  // Submit Handler calls loginUser() and setToken() from App
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser(username, password);
    setToken(token);
  };

  return (
    <div className="login-wrapper login-card">
      <div className="login-header">
        <h2>Log In:</h2>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="username-div login-item">
          <label htmlFor="loginusername" className="login-label">
            Username:{" "}
          </label>
          <input
            id="loginusername"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="password-div login-item">
          <label htmlFor="loginpassword" className="login-label">
            Password:{" "}
          </label>
          <input
            type="password"
            id="loginpassword"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <input type="submit" value="Log In" className="login-button" />
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

// const user = useSelector((state) => state.user)

//     const dispatch = useDispatch()

//   let history = useHistory();
//   const location = { pathname: "/home" };

//   async function loginUser(username, password) {
//     console.log("Loggin in: ", username, password);
//     // need a username and password to be sent on body
//     const credentials = { username: username, password: password };
//     const { data } = await axios.post(
//       "http://localhost:4004/api/auth/login",
//       credentials
//     );
//     dispatch({type: "SET_USER", value: data})
//     // update the route to reroute user
//     history.push(location);
//     console.log(window.history);
//     // set auth token:
//     console.log(data);
//     setToken(data);
//   }

//   const [username, setUserName] = useState();
//   const [password, setPassword] = useState();

//   let history = useHistory();
//   const location = { pathname: "/home" };

//   async function loginUser() {
//     console.log(username, password);
//     // need a username and password to be sent on body
//     const credentials = { username: username, password: password };
//     const { data } = await axios.post(
//       "http://localhost:4004/api/auth/login",
//       credentials
//     );
//     // update the route to reroute user
//     history.push(location);
//     console.log(window.history);
//     // set auth token:
//     console.log(data);
//     return data;
//   }

// import React, { useState } from "react";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { useHistory } from "react-router-dom";

// export default function Login() {
//   const history = useHistory();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const register = async () => {
//     try {
//       console.log("hellow");
//       const auth = getAuth();
//       console.log("second log");
//       const userCredentials = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log(userCredentials);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const login = async () => {
//     try {
//       const auth = getAuth();
//       const userCredentials = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log(userCredentials);
//       history.push("/home");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           login();
//         }}
//       >
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// }
