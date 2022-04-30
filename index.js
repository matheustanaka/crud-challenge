const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDatabase = require("./src/database/mongoose.db");

const UserRouter = require("./src/routes/user.routes");
const MedicineRouter = require("./src/routes/medicine.routes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectToDatabase();

//Defining our router as users
app.use("/users", UserRouter);
//Defining our router as medicines
app.use("/medicines", MedicineRouter);

const serverPort = process.env.PORT || 8000;

//Localhost port
app.listen(serverPort, () => console.log(`Listening on port ${port}`));
