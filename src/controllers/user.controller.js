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
    //Getting a unique user by Id
    async getByID() {
        try {
            //Adding a new User, so here will receive a new UserModel(name,email,passoword)
            const newUser = new UserModel(req.body); //req.body means that you will add some data inside your model
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
}

module.exports = UserController;
