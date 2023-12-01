import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <h2>Welcome!</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </>
  );
};

export default App;
