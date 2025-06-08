const express = require("express");
// const { getUserController, updateUserController, updatePasswordController, deleteUserController } = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const createResturantController = require("../controllers/restrurantController");

const router = express.Router();

// router.get("/getUser",authMiddleware,  );
// router.put("/updateUser",authMiddleware,  );
router.post('/create', authMiddleware, createResturantController )
// router.delete('/deleteUser/:id', authMiddleware, )

module.exports = router;
