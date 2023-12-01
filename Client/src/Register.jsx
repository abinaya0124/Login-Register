import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleValues = (e) => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", inputValue);
    const { name, email, password } = inputValue;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setInputValue({});
        toast.success("User Registered Succesfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={inputValue.name}
          name="name"
          onChange={handleValues}
        />
        <label>Email</label>
        <input
          type="email"
          value={inputValue.email}
          name="email"
          onChange={handleValues}
        />
        <label>Password</label>
        <input
          type="password"
          value={inputValue.password}
          name="password"
          onChange={handleValues}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
