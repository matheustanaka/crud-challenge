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
