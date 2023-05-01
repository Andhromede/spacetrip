const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isUser = require ("../middlewares/isUser");


router.get("/:id", isUser, userController.getOneUserById);
router.get("/", isUser, userController.getAllUsers);
router.delete("/delete/:id", isUser , userController.deleteUser);
router.put("/:id", isUser , userController.updateUser);
router.put("/anonymous/:id", isUser, userController.userAnonymous);
router.put("/password/:id", isUser , userController.updUserPassword);
router.put('/reset-password', userController.resetPassword);
router.put("/email/:id", userController.updUserEmail);
router.put('/forgot-password', userController.forgotPassword);


module.exports = router;