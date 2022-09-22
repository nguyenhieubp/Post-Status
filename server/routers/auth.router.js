const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controller");
const { checkCurrentUser } = require("../middleware/checkCurrentUser");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", checkCurrentUser, userController.getCurrentUser);
module.exports = router;
