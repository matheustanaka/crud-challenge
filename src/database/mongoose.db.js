const mongoose = require("mongoose");

const connectToDatabase = async () => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.rcxqisi.mongodb.net/?retryWrites=true&w=majority`;

    await mongoose.set("strictQuery", false);

    // console.log("mongo URL: ", uri)

    await mongoose.connect(uri,
        (error) => {
            if (error) {
                return console.log(
                    `Could not connect to MongoDB: ${error.message}`
                );
            }

            return console.log("Connected to MongoDB!");
        }
    );
};

module.exports = connectToDatabase;
