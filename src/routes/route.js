const express = require("express");
const router = express.Router();

const { createUsers, login, getAllUser } = require("../controllers/userControllers");
const { authenticate } = require("../middlewares/auth");


//---------User Api's----------//
router.post("/register", createUsers);
router.post("/login", login)
router.get("/getAllUser", authenticate, getAllUser)


module.exports = router