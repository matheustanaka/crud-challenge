const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongoose.db");
const UserModel = require("./src/models/user.model");
const UserRouter = require("./src/routes/user.routes");

dotenv.config();
const app = express();
app.use(express.json());
connectToDatabase();

app.use("/users", UserRouter);

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

app.patch("/users/:id", async (req, res) => {
    try {
        //Querying Id as parameter
        const userId = req.params.id;
        //req.body because the name will be chageable
        const userName = req.body;
        //Waiting the id to update our user name
        const userToUpdate = await UserModel.findById(userId);
        //If not found the user ID return a 404 error: Not Found
        if (!userToUpdate) {
            return res.status(404).json({ error: "Not Found User ID" });
        }
        //Defining whats allowed to update
        const nameToUdpate = ["name"];
        //Object.keys return all properties (name,email,password)
        const requestToUpdate = Object.keys(req.body);
        //looping udpate of every request to update
        for (const update of requestToUpdate) {
            //Verifying if is allowed to update name and include update
            if (nameToUdpate.includes(update)) {
                //the user to update receive user name with new data
                userToUpdate[update] = userName[update];
            }
        }
        //waiting user to update save
        await userToUpdate.save();
        //return a status 200: The request was sucessfully
        return res.status(200).json(userToUpdate);
    } catch (error) {
        //return a generic error
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        //Querying our ID
        const userId = req.params.id;
        //Finding user Id inside our model
        const userToDelete = await UserModel.findById(userId);
        //If there is not a Id return a 404 status as not found
        if (!userToDelete) {
            return res.status(404).json({ error: "Not Found User ID" });
        }
        //User deleted should wait the process of find an id and delete, passing user id as paramater
        const userDeleted = await UserModel.findByIdAndDelete(userId);
        //return a 200 status: The request was successfully
        return res.status(200).json(userDeleted);
    } catch (error) {
        //return a generic error
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3333, () => console.log("Listening on port 3333"));
