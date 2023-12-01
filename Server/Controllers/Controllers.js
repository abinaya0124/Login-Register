const User = require("../Models/User");
const { hashPassword, comparePassword } = require("../Helpers/Auth.js");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("Test is working");
};

//register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be of 6 character long",
      });
    }

    const ifUserExist = await User.findOne({ email });

    if (ifUserExist) {
      return res.json({
        error: "Email is already taken.. Please Login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//login endpoint

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if userexists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No User Found",
      });
    }

    //check password
    const passwordMatch = await comparePassword(password, user.password);
    if (passwordMatch) {
      //   res.json("password matched");
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!passwordMatch) {
      res.json({
        error: "Passwords Donot Match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = { test, registerUser, loginUser, getProfile };
