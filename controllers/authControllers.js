const user = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// registern controller
const registerController = async (req, res) => {
  try {
    const { Name, email, password, Phone_Number, address, Profile, userType } =
      req.body;
    console.log(req.body);
    // validation
    if (!Name || !email || !password || !Phone_Number || !userType) {
      console.log(
        "🚀 ~ registerController ~ (!userName|| !email || !password || !Phone_Number || Profile):",
        !Name || !email || !password || !Phone_Number || Profile 
      );
      return res.status(400).json({
        status: false,
        message: "Please Provide All Fields",
      });
    }
    const exisitng = await user.findOne({ email });

    if (exisitng) {
      return res.status(500).json({
        status: false,
        message: "User with this email is already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await user.create({
      Name,
      email,
      password: hashedPassword,
      address,
      Phone_Number,
      userType,
    });
    res.status(200).json({
      status: true,
      message: "user created with this these details",
      User,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error In Register API",
      error,
    });
    console.log(error.message);
  }
};
// Login route

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).json({
        status: false,
        message: "email or password incorrect",
      });
    }
    // check user
    const findUser = await user.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "Email or password mismatched",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      res.status(500).json({
        status: false,
        message: "Incorrect Password",
      });
    }
    // Token
    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("🚀 ~ loginController ~ token:", token)
    findUser.password = undefined;
    res.status(200).json({
      status: true,
      message: "Login successfully",
      token,
      findUser,
    });
      console.log("🚀 ~ res.status ~ findUser:", findUser)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: "error while loggin ",
    });
  }
};

module.exports = { registerController, loginController };
