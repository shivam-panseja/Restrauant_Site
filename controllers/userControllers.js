const user = require("../models/userModels"); // Import the model with lowercase "user"
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    const userId = req.user._id; // Access the decoded user ID from req.user

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    const User = await user.findById(userId); // Use `user` here for the query

    if (!User) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    User.password = undefined;

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      User, // Return the user object
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

//update user
const updateUserController = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("🚀 ~ updateUserController ~ userId:", userId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    console.log(req.body);
    const { Name, email, password, Phone_Number, address, Profile, userType } =
    req.body;
    const User = await user.findByIdAndUpdate(userId, {
      Name: req.body.Name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      Profile: req.body.Profile,
      Phone_Number: req.body.Phone_Number,
      // Phone_Number: req.body.Phone_Number,
    },
  //  console.log("saving the data into database")
  );

    User.save();

    return res.json({ status: 200, message: "Your profile is updated now " });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// update User Password
const updatePasswordController = async (req, res) => {
  try {
    const User = await user.findById(req.user._id);
    if (!User) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // get passwrod and update password
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Old or New Password",
      });
    }
    console.log(
      "🚀 ~ updatePassword ~ ldPassword, newPassword} = :",
      oldPassword,
      newPassword
    );
    const isMatch = await bcrypt.compare(oldPassword, User.password);
    console.log("🚀 ~ updatePassword ~ isMatch:", isMatch);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "THE OLD PASSWORD IS INCORRECT",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save;
    return res.json({ status: 200, message: "Your Password is updated now " });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Update Password API",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Update Password API",
      error,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  deleteUserController,
};
