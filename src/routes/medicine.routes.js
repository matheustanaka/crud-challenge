const express = require("express");
const MedicineController = require("../controllers/medicine.controller");
const router = express.Router();
//Getting all medicines
router.get("/", async (req, res) => {
    return new MedicineController(req, res).getAll();
});
//Getting an unique Medicine by ID
router.get("/:id", async (req, res) => {
    return new MedicineController(req, res).getByID();
});
//Creating an medicine
router.post("/", async (req, res) => {
    return new MedicineController(req, res).create();
});
//Updating medicine by ID, here you can update all medicine properties
router.put("/:id", async (req, res) => {
    return new MedicineController(req, res).update();
});
//Updating medicine name
router.patch("/:id", async (req, res) => {
    return new MedicineController(req, res).updateName();
});
//Deleting medicine by ID
router.delete("/:id", async (req, res) => {
    return new MedicineController(req, res).delete();
});

module.exports = router;