const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();
//Getting all users
router.get("/", async (req, res) => {
    return new UserController(req, res).getAll();
});
//Getting an unique User by ID
router.get("/:id", async (req, res) => {
    return new UserController(req, res).getByID();
});
//Creating an user
router.post("/", async (req, res) => {
    return new UserController(req, res).create();
});
//Updating user by ID, here you can update name, email and password
router.put("/users/:id", async (req, res) => {
    return new UserController(req, res).update();
});

module.exports = router;
