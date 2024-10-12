//@desc Login A user
//@route POST /api/users/login
import dotenv from "dotenv";
dotenv.config();

import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@access public
const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    res.status(400);
    throw new Error("All Fields are mandatory.");
  }
  const checkUser = await userModel.findOne({ userEmail });

  if (!checkUser) {
    res.status(400);
    throw new Error("User does not exists");
  }
  if (
    checkUser &&
    (await bcrypt.compare(userPassword, checkUser.userPassword))
  ) {
    let accessToken = jwt.sign(
      {
        user: {
          userName: checkUser.userName,
          userEmail: checkUser.userEmail,
          userId: checkUser._id,
        },
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "5m",
      }
    );
    res.status(200).send(accessToken);
  } else {
    res.status(400);
    throw new Error("Invalid Password");
    // res.send("Invalid Password");//dead code
  }
};
//@desc register A user
//@route POST /api/users/register
//@access public

const register = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  if (!userName || !userEmail || !userPassword) {
    res.status(400);
    throw new Error("All Fields are mandatory.");
  }

  const checkUser = await userModel.findOne({ userEmail });

  if (checkUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(userPassword, 10);

  const createdUser = await userModel.create({
    userName,
    userEmail,
    userPassword: hashedPassword,
  });

  if (createdUser) {
    res.status(201);
    res.send({
      _id: createdUser._id,
      userEmail,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
};

//@desc gets the current user
//@route GET /api/users/current
//@access private
const getCurrentUser = (req, res) => {
  res.status(200);
  res.json(req.user);
};

export { login, register, getCurrentUser };
