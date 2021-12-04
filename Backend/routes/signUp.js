const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    phone: Joi.string().min(3).max(30).required(),
    profession: Joi.string().min(3).max(30).required(),
    country: Joi.string().min(3).max(30).required(),
    dob: Joi.string().min(3).max(30).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists...");

  const { name, email, password, phone, profession, country, dob } = req.body;

  user = new User({
    name,
    email,
    password,
    phone,
    profession,
    country,
    dob,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const jwtSecretKey = process.env.TODO_APP_JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profession: user.profession,
      country: user.country,
      dob: user.dob,
    },
    jwtSecretKey
  );

  res.send(token);
});
// router.get("/", auth, async (req, res, next) => {
//   try {
//     const todos = await Todo.find().sort({ date: -1 });
//     const filteredTodos = todos.filter((todo) => todo.uid === req.user._id);
//     res.send(filteredTodos);
//   } catch (error) {
//     res.status(500).send("Error: " + error.message);

//     winston.error(error.message);
//   }
// });
module.exports = router;
