const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongoose.db");

const UserRouter = require("./src/routes/user.routes");
const MedicineRouter = require("./src/routes/medicine.routes");

dotenv.config();
const app = express();
app.use(express.json());
connectToDatabase();

//Defining our router as users
app.use("/users", UserRouter);
//Defining our router as medicines
app.use("/medicines", MedicineRouter);

//Localhost port
app.listen(3333, () => console.log("Listening on port 3333"));
