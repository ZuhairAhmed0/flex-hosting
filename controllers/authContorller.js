const User = require("../models/User");
const jwt = require("jsonwebtoken");
const maxAge = 7 * 24 * 60 * 60 * 1000;

const handleErrors = (err) => {
  const errors = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (err.code === 11000) {
    errors.email = "that email is already reqistered";
    return errors;
  }

  if (err.message === "password is not match") {
    errors.confirmPassword = "password is not match";
  }

  if (err.message === "incorrect email") {
    errors.email = "that email is not reqistered";
  }

  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const authContorller = {
  signup: (req, res, next) => {
    if (res.locals.user) {
      res.redirect("/");
    } else {
      res.render("signup");
    }
  },
  create: async (req, res, next) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    try {
      // if (password === confirmPassword) {
      const user = await User.create({
        firstname,
        lastname,
        email,
        password,
      });
      res.status(200).json({ user: user.id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(404).json(errors);
    }
  },

  login: (req, res, next) => {
    if (res.locals.user) {
      res.redirect("/");
    } else {
      res.render("login");
    }
  },

  authUser: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = jwt.sign({ id: user.id }, "this is user token", {
        expiresIn: maxAge,
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge,
      });
      res.status(200).json({ user: user.id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(404).json(errors);
    }
  },

  contactMe: (req, res) => {
    try {
      console.log(req.body);
      res.redirect("/contact");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authContorller;
