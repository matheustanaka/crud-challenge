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
    symptoms: {
        type: String,
        required: true,
    },
    medicines: {
        type: Schema.Types.ObjectId, ref: 'Medicine',
    }
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
