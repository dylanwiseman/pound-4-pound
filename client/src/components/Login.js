import PropTypes from "prop-types";

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
