import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndCookie from "../utils/generateTokenAndCookie.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username Already Exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in the signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: "Bhai Galat Password Ya fir Username Bhare ho " });
    }

    generateTokenAndCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in the login route", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    console.log("Error in the logout route", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMyAccount = async (req, res) => {
  try {
    const { username } = req.body;

    const deleteAcc = await User.findOneAndDelete(username);

    if (!deleteAcc) {
      res.status(400).json({ error: "User Not Found" });
    }

    res.status(200).json({ message: "Account Deleted Success!" });
  } catch (error) {
    console.log("Error in delete route", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const updateDetails = await User.findByIdAndUpdate(id, req.body);

    if (!updateDetails) {
      res.status(400).json({ message: "User Not found" });
    }

    res.status(200).json({ message: "Details Updated Success!" });
  } catch (error) {
    console.log("Error in Update route", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
