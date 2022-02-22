const MedicineModel = require("../models/medicine.model");
const mongoose = require("mongoose");

class MedicineController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    //Getting all medicines
    async getAll() {
        try {
            //Waiting the const medicines find MedicineModel (name,description,price,quantity,brand)
            const medicines = await MedicineModel.find({});
            //Verifying if medicines exists
            if (!medicines) {
                //An example of verification errors
                //If medicines are not found, return a status 404: The server can not find the requested resource
                return this.res
                    .status(404)
                    .json({ error: "Not Found medicines" });
            }
            //If medicines exists should return a status 200: The request succeeded
            return this.res.status(200).json(medicines);
        } catch (error) {
            //Return a generic error
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
    //Getting an unique medicine by ID
    async getByID() {
        try {
            //Requesting an id as a paramater
            const medicineId = this.req.params.id;
            //Waiting const medicine find the medicine ID inside our Model
            const medicine = await MedicineModel.findById(medicineId);
            //If not found medicine Id return a 404 status: The server can not find the requested resource
            if (!medicine) {
                return this.res
                    .status(404)
                    .json({ error: "Not Found medicine ID" });
            }
            //return a 200 status: The requested succeeded
            return this.res.status(200).json(medicine);
        } catch (error) {
            //send a 500 status: The server has encountered a situation it does not know how to handle.
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
    //Create medicine
    async create() {
        try {
            //Adding a new medicine, so here will receive a new medicineModel(name,email,passoword)
            const newmedicine = new MedicineModel(this.req.body); //req.body means that you will add some data inside your model
            //Here you should wait, after, the newmedicine will be saved in database
            await newmedicine.save();
            //send a 201 status: The request succeeded, new medicine was created.
            this.res.status(201).json(newmedicine);
        } catch (error) {
            //send a 500 status: The server has encountered a situation it does not know how to handle.
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
    //update the medicine information
    async update() {
        try {
            //Requesting id as a query params
            const medicineId = this.req.params.id;
            //req.body to add new datas
            const medicineData = this.req.body;
            //medicine to update should wait for medicine id
            const medicineToUpdate = await MedicineModel.findById(medicineId);
            //Verifying if was found the medicine ID
            if (!medicineToUpdate) {
                //if verification is true, return 404 status: The server can not find the requested resource
                return this.res
                    .status(404)
                    .json({ error: "Not Found medicine" });
            }
            //allowed to update define the properties that should be changeable
            const allowedToUpdate = [
                "name",
                "description",
                "price",
                "quantity",
                "brand",
            ];
            //The Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
            const requestedToUpdate = Object.keys(this.req.body);
            //looping the udpate of requested to update
            for (const update of requestedToUpdate) {
                //if was allowed to udpate should include the update
                if (allowedToUpdate.includes(update)) {
                    //medicine to update receive medicine data with the new data
                    medicineToUpdate[update] = medicineData[update];
                } else {
                    //send a 400 status: The server could not understand the request due to invalid syntax.
                    return this.res.status(400).json({
                        error: "You can't update your medicine information",
                    });
                }
            }
            //Waiting medicine to update save inside our database
            await medicineToUpdate.save();
            //return a 200 status: The requested succeeded
            return this.res.status(200).json(medicineToUpdate);
        } catch (error) {
            //send a 500 status: The server has encountered a situation it does not know how to handle.
            this.res.status(500).json({
                error: "Internal server error",
            });
        }
    }
    //Patch: updating only the medicine name
    async updateName() {
        try {
            //Querying Id as parameter
            const medicineId = this.req.params.id;
            //req.body because the name will be chageable
            const medicineName = this.req.body;
            //Waiting the id to update our medicine name
            const medicineToUpdate = await MedicineModel.findById(medicineId);
            //If not found the medicine ID return a 404 error: Not Found
            if (!medicineToUpdate) {
                return this.res
                    .status(404)
                    .json({ error: "Not Found medicine ID" });
            }
            //Defining whats allowed to update
            const nameToUdpate = ["name"];
            //Object.keys return all properties (name,email,password)
            const requestToUpdate = Object.keys(this.req.body);
            //looping udpate of every request to update
            for (const update of requestToUpdate) {
                //Verifying if is allowed to update name and include update
                if (nameToUdpate.includes(update)) {
                    //the medicine to update receive medicine name with new data
                    medicineToUpdate[update] = medicineName[update];
                }
            }
            //waiting medicine to update save
            await medicineToUpdate.save();
            //return a status 200: The request was sucessfully
            return this.res.status(200).json(medicineToUpdate);
        } catch (error) {
            //return a generic error
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
    //Deleting medicine by ID
    async delete() {
        try {
            //Querying our ID
            const medicineId = this.req.params.id;
            //Finding medicine Id inside our model
            const medicineToDelete = await MedicineModel.findById(medicineId);
            //If there is not a Id return a 404 status as not found
            if (!medicineToDelete) {
                return this.res
                    .status(404)
                    .json({ error: "Not Found medicine ID" });
            }
            //medicine deleted should wait the process of find an id and delete, passing medicine id as paramater
            const medicineDeleted = await MedicineModel.findByIdAndDelete(
                medicineId
            );
            //return a 200 status: The request was successfully
            return this.res.status(200).json(medicineDeleted);
        } catch (error) {
            //return a generic error
            return this.res
                .status(500)
                .json({ error: "Internal server error" });
        }
    }
}

module.exports = MedicineController;
