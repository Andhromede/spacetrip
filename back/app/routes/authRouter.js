const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


router.post("/register/", authController.signUp);
router.post("/signin/", authController.signIn);
router.post("/googlelogin/", authController.googleLogin);
router.put("/email-activate", authController.activateAccount);


module.exports = router;