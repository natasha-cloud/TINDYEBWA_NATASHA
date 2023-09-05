const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/userModel");
const session = require('express-session');


dotenv.config();

const userRoutes = express.Router();
userRoutes.use(
  session({
    secret:process.env.JWT_SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
  })
);
// Register
const registerUser = async (req, res) => {
  const { email,username, password } = req.body;

  try {
    var user = await User.findOne({ username: username });

    if (user) {
      return res.status(400).send("Account already exists");
    } else {
      user = new User({ email:email, username: username, password: password });
      user = await user.save();
      // return res.status(200).send("Account created successfully");
      return res.status(200).redirect("/login");

      // const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET_KEY);

      // return res.status(201).send({ user: user, token: token });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send("Sorry, something went wrong");
  }
};

userRoutes.post("/register", registerUser);

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;


  
  // console.log(username,password);
  try {
    const user = await User.findOne({ email });
    console.log(user)
    // console.log(user && (await user.matchPassword(password) 
    // ))
    if (user && (await user.matchPassword(password))) {
      // return res.status(200).send({ loading: true });
      setTimeout(() => {
      const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET_KEY);
      req.session.user = user;
      if(user && user.role === 'admin') {return res.status(200).redirect('/dashboard');}
      return res.status(200).redirect("/services");
    }, 2000)
    } else {
      // return res.status(400).send("Invalid Credentials");
      // req.flash('error',"Invalid credentials")
      return res.send("Invalid credentials")
      
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Sorry, something went wrong");
  }

};

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const adminUser = new User({
        username: 'admin',
        password: 'admin', 
        role: 'admin',
        email: 'admin@admin.com',
      });
      await adminUser.save();
      console.log('Default admin user created.');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
}


userRoutes.post("/login", loginUser);

// Password recovery route
userRoutes.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Generate a unique token
      const token = crypto.randomBytes(32).toString('hex');

      // Store the token and associate it with the user
      // You might use a database to store this information

      // Send the password reset email
      const transporter = nodemailer.createTransport({
        // Configure your email service provider here
        // For example, for Gmail, you can use the SMTP settings
      });

      const mailOptions = {
        from: 'natashaahumuza@icloud.com',
        to: user.email,
        subject: 'Password Reset',
        text: `To reset your password, click the following link: ${resetLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error sending email.' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ message: 'Password reset email sent.' });
        }
      });
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = userRoutes;
