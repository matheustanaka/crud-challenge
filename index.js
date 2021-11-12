const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongoose.db");
const UserModel = require("./src/models/user.model");

dotenv.config();
const app = express();
app.use(express.json());
connectToDatabase();
//Getting all users
app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Not Found Users" });
    }
});

//Creating an user
app.post("/users", async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "You can't create an User" });
    }
});

//Getting an unique User by ID
app.get("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "Not Found User ID" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Not Found User ID" });
    }
});

//Updating user by ID, here you can update name, email and password
app.put("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        const userToUpdate = await UserModel.findById(userId);

        if (!userToUpdate) {
            return res.status(500).json({ error: "Not Found User" });
        }

        const allowedToUpdate = ["name", "email", "password"];
        const requestedToUpdate = Object.keys(req.body);

        for (const update of requestedToUpdate) {
            if (allowedToUpdate.includes(update)) {
                userToUpdate[update] = userData[update];
            } else {
                return res
                    .status(500)
                    .json({ error: "You can't update your user information" });
            }
        }

        await userToUpdate.save();
        return res.status(200).json(userToUpdate);
    } catch (error) {
        res.status(500).json({
            error: "You can't update your user information",
        });
    }
});

app.listen(3333, () => console.log("Listening on port 3333"));
