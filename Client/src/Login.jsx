import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLoginValues = (e) => {
    setLoginValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLoginSUbmit = async (e) => {
    e.preventDefault();
    console.log("Login Form Submitted");
    console.log(loginValues);
    const { email, password } = loginValues;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setLoginValues({});
        navigate("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <div>
      <h5>Login</h5>
      <form onSubmit={handleLoginSUbmit}>
        <label>Email</label>
        <input
          type="text"
          value={loginValues.email}
          name="email"
          onChange={handleLoginValues}
        />
        <label>Password</label>
        <input
          type="password"
          value={loginValues.password}
          name="password"
          onChange={handleLoginValues}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
