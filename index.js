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
        //Verifying if users exists
        if (!users) {
            //An example of verification errors
            //If users are not found, return a status 404: The server can not find the requested resource
            return res.status(404).json({ error: "Not Found Users" });
        }
        //If users exists should return a status 200: The request succeeded
        return res.status(200).json(users);
    } catch (error) {
        //Return a generic error
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
        //send a 500 status: The server has encountered a situation it does not know how to handle.
        return res.status(500).json({ error: "Internal server error" });
    }
});

//Updating user by ID, here you can update name, email and password
app.put("/users/:id", async (req, res) => {
    try {
        //Requesting id as a query params
        const userId = req.params.id;
        //req.body to add new datas
        const userData = req.body;
        //User to update should wait for user id
        const userToUpdate = await UserModel.findById(userId);
        //Verifying if was found the user ID
        if (!userToUpdate) {
            //if verification is true, return 404 status: The server can not find the requested resource
            return res.status(404).json({ error: "Not Found User" });
        }
        //allowed to update define the properties that should be changeable
        const allowedToUpdate = ["name", "email", "password"];
        //The Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
        const requestedToUpdate = Object.keys(req.body);
        //looping the udpate of requested to update
        for (const update of requestedToUpdate) {
            //if was allowed to udpate should include the update
            if (allowedToUpdate.includes(update)) {
                //user to update receive user data with the new data
                userToUpdate[update] = userData[update];
            } else {
                //send a 400 status: The server could not understand the request due to invalid syntax.
                return res
                    .status(400)
                    .json({ error: "You can't update your user information" });
            }
        }
        //Waiting user to update save inside our database
        await userToUpdate.save();
        //return a 200 status: The requested succeeded
        return res.status(200).json(userToUpdate);
    } catch (error) {
        //send a 500 status: The server has encountered a situation it does not know how to handle.
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

app.listen(3333, () => console.log("Listening on port 3333"));
