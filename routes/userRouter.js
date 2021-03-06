const express = require("express");
const { User, Entry } = require("../models");
const { hash, compare, encode, verify } = require("../auth");
const moment = require("moment");

const userRouter = express.Router();

//Get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

//Get a specific user
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Register route
userRouter.post("/register", async (req, res) => {
  console.log("register called");
  try {
    const { email, name, password } = req.body;
    console.log(email, name, password);
    const emailExists = await User.findOne({
      where: { email: email }
    });

    if (emailExists) {
      return res.status(409).send("This email is already in use.");
    }

    if (password) {
      const passwordDigest = await hash(password);
      const user = await User.create({
        name,
        email,
        password_digest: passwordDigest
      });
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      const token = encode(userData);
      res.json({ token, userData });
    } else {
      const user = await User.create({ name, email });
      const userData = {
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      };

      const token = encode(userData);

      res.json({ token, userData });
    }
  } catch (e) {
    console.error(e);
  }
});

//Login route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user !== null) {
      const isAuthenticated = await compare(password, user.password_digest);
      if (isAuthenticated === true) {
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        const token = encode(userData);
        return res.json({ token, userData });
      }
      res.json({ msg: "Invalid Credentials" });
    }
    return res.status(401).send("Invalid Credentials");
  } catch (err) {
    console.error(err);
  }
});

userRouter.post("/:user_id/entry", async (req, res) => {
  try {
    const user = await User.findByPk(req.body.user_id);
    // get user entries
    const resp = await user.getEntries();
    const dates = resp
      // formats dates to MM/DD/YYYY
      .map(entry => moment(entry.dataValues.createdAt).format("MM-DD-YYYY"))
      // compares dates to current day (unique date)
      .filter(date => date === moment().format("MM-DD-YYYY"));

    if (dates.length === 0) {
      const { mood, exercise, memo } = req.body;
      const entry = await Entry.create({
        mood,
        exercise,
        memo
      });
      entry.setUser(user);
      res.json(entry);
    }
  } catch (err) {
    console.error(err);
  }
});

//Get a user entries
userRouter.get("/:user_id/entries", async (req, res) => {
  try {
    const entries = await Entry.findAll({
      where: { user_id: req.params.user_id }
    });
    res.json({ entries });
  } catch (err) {
    res.stats(500).send(err.message);
  }
});

module.exports = userRouter;
