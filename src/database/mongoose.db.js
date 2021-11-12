const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(
        "mongodb+srv://mvthexz:entria@cluster0.1fcuv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        () => console.log("Database is connected 😎")
    );
};

module.exports = connectToDatabase;
