const { User } = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const crypto =require('crypto')
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();

const EMAIL = process.env.EMAIL || `http://localhost:3000`


const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.sendGrid,
    },
  })
);

const createToken = (id) => {
  return jwt.sign({ id }, process.env.mySecret, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const signup = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ error: "user already exists " });
  } else {
    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    if (saveUser) {
      transporter.sendMail({
        to: saveUser.email,
        from: ['imdebayandebnath007@gmail.com'],
        subject: "signup success",
        html: "<h1>Welcome to sociohub</h1>",
      });
      res.status(200).json(saveUser);
    } else {
      res.status(400).json({
        error: "failed to save the user",
      });
    }
  }
};

const signin = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  const { email, password } = req.body;
  const user = await User.authenticate(email, password);
  if (user) {
    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        followers: user.followers,
        following: user.following,
      },
    });
  } else {
    res.status(400).json({
      error: "please check your email or password",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "signout successfull" });
};

const isSignin = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.mySecret, async function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: "unauthorized token" });
      }
      req.auth = decodedToken;
      next();
    });
  } else {
    res.status(401).json({ error: "token not found" });
  }
};

const isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!checker) {
    return res.status(401).json({ error: "Access denied " });
  }
  next();
};

const resetPassword = async (req, res) => {
    crypto.randomBytes(32, async(err, buffer) => {
        if(err){
            return res.status(400).json({ error: err.message })
        }
        const token = buffer.toString('hex')
        const user = await User.findOne({ email: req.body.email})
        if(user){
            user.resetToken = token
            user.expiresIn = Date.now() + 3600000
            const newUser = await user.save()
            transporter.sendMail({
                to: newUser.email,
                from: ['imdebayandebnath007@gmail.com'],
                subject: 'Reset Password',
                html: `<h2>You requested for reset password</h2>
                        <h3>Click this <a href="${EMAIL}/reset/${token}">link</a> to reset your password</h3>`
            })
            res.status(200).json('check your email')
        }else{
            res.status(400).json({ error: "email doesn't exist"})
        }
    })
}

const updatePassword = async (req, res) => {
  const { password, token } = req.body
  const user = await User.findOne({ resetToken: token, expiresIn:{ $gt: Date.now()}})
  if(user){
    user.password = password
    user.resetToken = undefined
    user.expiresIn = undefined
    const newUser = await user.save()
    res.status(200).json('password changed')
  }else{
    res.status(400).json({ error: 'Try again session expired'})
  }
}

module.exports = {
  signup,
  signin,
  signout,
  isSignin,
  isAuthenticated,
  resetPassword, 
  updatePassword
};
