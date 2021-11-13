const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();
//Getting all users
router.get("/", async (req, res) => {
    return new UserController(req, res).getAll();
});
//Creating an user
router.post("/users", async (req, res) => {
    return new UserController(req, res).getByID();
});

module.exports = router;
