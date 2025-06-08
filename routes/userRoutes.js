const express = require("express");
const { getUserController, updateUserController, updatePasswordController, deleteUserController } = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getUser",authMiddleware,  getUserController);
router.put("/updateUser",authMiddleware,  updateUserController);
router.post('/resetPassword', authMiddleware, updatePasswordController)
router.delete('/deleteUser/:id', authMiddleware, deleteUserController)

module.exports = router;
