const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/users", userController.getAllUsers);

router.post("/users", userController.postNewUsers);

module.exports = router;
