const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicine" }],
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
