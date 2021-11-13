const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongoose.db");
const UserModel = require("./src/models/user.model");
const UserRouter = require("./src/routes/user.routes");

dotenv.config();
const app = express();
app.use(express.json());
connectToDatabase();

//Defining our router as users
app.use("/users", UserRouter);

//Localhost port
app.listen(3333, () => console.log("Listening on port 3333"));
