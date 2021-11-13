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
        //Waiting the const users find UserModel(name,email,senha)
        const users = await UserModel.find({});
        if (!users) {
            //If users are not found, return a status 404: The server can not find the requested resource
            return res.status(404).json({ error: "Not Found Users" });
        }
        //If users exists should return a status 200: The request succeeded
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

//Creating an user
app.post("/users", async (req, res) => {
    try {
        //Adding a new User, so here will receive a new UserModel(name,email,passoword)
        const newUser = new UserModel(req.body); //req.body means that you will add some data inside your model
        //Here you should wait, after, the newUser will be saved in database
        await newUser.save();
        //send a 201 status: The request succeeded, new User was created.
        res.status(201).json(newUser);
    } catch (error) {
        //send a 500 status: The server has encountered a situation it does not know how to handle.
        return res.status(500).json({ error: "Internal server error" });
    }
});

//Getting an unique User by ID
app.get("/users/:id", async (req, res) => {
    try {
        //Requesting an id as paramater
        const userId = req.params.id;
        //Waiting const user find the User ID inside our Model
        const user = await UserModel.findById(userId);
        //If not found user Id return a 404 status: The server can not find the requested resource
        if (!user) {
            return res.status(404).json({ error: "Not Found User ID" });
        }
        //return a 200 status: The requested succeeded
        return res.status(200).json(user);
    } catch (error) {
        //If not found user Id return a 404 status: The server can not find the requested resource
        return res.status(500).json({ error: "Internal server error" });
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
            error: "Internal server error",
        });
    }
});

app.listen(3333, () => console.log("Listening on port 3333"));
