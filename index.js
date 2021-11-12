const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongoose.db");
const UserModel = require("./src/models/user.model");

dotenv.config();
const app = express();
app.use(express.json());
connectToDatabase();

app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Not Found Users" });
    }
});

app.post("/users", async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "You can't create an User" });
    }
});

app.listen(3333, () => console.log("Listening on port 3333"));
