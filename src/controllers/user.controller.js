const UserModel = require("../models/user.model");
const mongoose = require("mongoose");

class UserController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    //Getting all users
    async getAll() {
        try {
            //Waiting the const users find UserModel(name,email,senha)
            const users = await UserModel.find({});
            //Verifying if users exists
            if (!users) {
                //An example of verification errors
                //If users are not found, return a status 404: The server can not find the requested resource
                return this.res.status(404).json({ error: "Not Found Users" });
            }
            //If users exists should return a status 200: The request succeeded
            return this.res.status(200).json(users);
        } catch (error) {
            //Return a generic error
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
    //Getting an unique user by ID
    async getByID() {
        try {
            //Requesting an id as a paramater
            const userId = this.req.params.id;
            //Waiting const user find the User ID inside our Model
            const user = await UserModel.findById(userId);
            //If not found user Id return a 404 status: The server can not find the requested resource
            if (!user) {
                return this.res
                    .status(404)
                    .json({ error: "Not Found User ID" });
            }
            //return a 200 status: The requested succeeded
            return this.res.status(200).json(user);
        } catch (error) {
            //send a 500 status: The server has encountered a situation it does not know how to handle.
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
    //Create User
    async create() {
        try {
            //Adding a new User, so here will receive a new UserModel(name,email,passoword)
            const newUser = new UserModel(this.req.body); //req.body means that you will add some data inside your model
            //Here you should wait, after, the newUser will be saved in database
            await newUser.save();
            //send a 201 status: The request succeeded, new User was created.
            this.res.status(201).json(newUser);
        } catch (error) {
            //send a 500 status: The server has encountered a situation it does not know how to handle.
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
    //update the user information
    async update() {
        try {
            //Requesting id as a query params
            const userId = this.req.params.id;
            //req.body to add new datas
            const userData = this.req.body;
            //User to update should wait for user id
            const userToUpdate = await UserModel.findById(userId);
            //Verifying if was found the user ID
            if (!userToUpdate) {
                //if verification is true, return 404 status: The server can not find the requested resource
                return this.res.status(404).json({ error: "Not Found User" });
            }
            //allowed to update define the properties that should be changeable
            const allowedToUpdate = ["name", "email", "password"];
            //The Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
            const requestedToUpdate = Object.keys(this.req.body);
            //looping the udpate of requested to update
            for (const update of requestedToUpdate) {
                //if was allowed to udpate should include the update
                if (allowedToUpdate.includes(update)) {
                    //user to update receive user data with the new data
                    userToUpdate[update] = userData[update];
                } else {
                    //send a 400 status: The server could not understand the request due to invalid syntax.
                    return this.res.status(400).json({
                        error: "You can't update your user information",
                    });
                }
            }
            //Waiting user to update save inside our database
            await userToUpdate.save();
            //return a 200 status: The requested succeeded
            return this.res.status(200).json(userToUpdate);
        } catch (error) {
            //send a 500 status: The server has encountered a situation it does not know how to handle.
            this.res.status(500).json({
                error: "Internal server error",
            });
        }
    }
    //Patch: updating only the user name
    async updateName() {
        try {
            //Querying Id as parameter
            const userId = this.req.params.id;
            //req.body because the name will be chageable
            const userName = this.req.body;
            //Waiting the id to update our user name
            const userToUpdate = await UserModel.findById(userId);
            //If not found the user ID return a 404 error: Not Found
            if (!userToUpdate) {
                return this.res
                    .status(404)
                    .json({ error: "Not Found User ID" });
            }
            //Defining whats allowed to update
            const nameToUdpate = ["name"];
            //Object.keys return all properties (name,email,password)
            const requestToUpdate = Object.keys(this.req.body);
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
            return this.res.status(200).json(userToUpdate);
        } catch (error) {
            //return a generic error
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
    //Deleting user by ID
    async delete() {
        try {
            //Querying our ID
            const userId = this.req.params.id;
            //Finding user Id inside our model
            const userToDelete = await UserModel.findById(userId);
            //If there is not a Id return a 404 status as not found
            if (!userToDelete) {
                return this.res
                    .status(404)
                    .json({ error: "Not Found User ID" });
            }
            //User deleted should wait the process of find an id and delete, passing user id as paramater
            const userDeleted = await UserModel.findByIdAndDelete(userId);
            //return a 200 status: The request was successfully
            return this.res.status(200).json(userDeleted);
        } catch (error) {
            //return a generic error
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
}

module.exports = UserController;
