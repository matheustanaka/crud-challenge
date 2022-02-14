const { Schema, model } = require("mongoose");

const MedicineSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    }
});

const MedicineModel = model("Medicine", MedicineSchema);

module.exports = MedicineModel;
