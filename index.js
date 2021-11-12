const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongoose.db");

dotenv.config();
const app = express();
app.use(express.json());
connectToDatabase();

app.get("/user", (request, response) => {
    return response.json({ message: "Hello World" });
});

app.listen(3333, () => console.log("Listening on port 3333"));
