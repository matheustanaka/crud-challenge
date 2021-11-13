const UserModel = require("../models/user.model");
const mongoose = require("mongoose");

class UserController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

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
}

module.exports = UserController;
