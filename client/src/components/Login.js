// import React, { useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
// import { withRouter, useHistory } from "react-router";

export default function Login({
  setToken,
  loginUser,
  setUserName,
  setPassword,
  username,
  password,
}) {
  // Submit Handler calls loginUser and setToken from App
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser(username, password);
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

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
