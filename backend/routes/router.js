const express = require("express");
const router = express.Router();
const students = require("../models/studSchema");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define the storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Add a new student
router.post("/addstud", upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'documenetImg', maxCount: 10 }]), async (req, res) => {
    try {
        const profile = req.files['profile'] ? req.files['profile'][0].filename : null;
        const documenetImg = req.files['documenetImg'].map(file => file.filename);

        const { name, address, email, age } = req.body;

        if (!name || !address || !email || !age) {
            return res.status(422).json("Please fill in all the required fields.");
        }

        // Add validation for image size and total size here (use the same logic as in your schema)
        // ...

        const prestud = await students.findOne({ email: email });

        if (prestud) {
            return res.status(422).json("This student already exists.");
        } else {
            const addstudent = new students({ name, address, email, age, profile, documenetImg });
            await addstudent.save();
            res.status(201).json(addstudent);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal server error");
    }
});



//get student Data
router.get("/getstud", async(req,res)=>{
    try{
        const studdata= await students.find();
        res.status(201).json(studdata);
    }catch(err){
        res.status(422).json(err)
    }
})

//get signle student Data
router.get("/getstud/:id", async(req,res)=>{
    try{
       const {id}=req.params;
       const singlestud=await students.findById({_id:id});
       res.status(201).json(singlestud);
    }catch(err){
        res.status(422).json(err);
    }
})


//Delete student Data
router.delete("/deletestud/:id", async(req,res)=>{
    try{
       const {id} = req.params;
       const deltestud=await students.findByIdAndDelete({_id:id});
       res.status(201).json(deltestud);
    }catch(err){
        res.status(422).json(err);
    }
})

// update student data
router.patch("/updatestud/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updatestud = await students.findByIdAndUpdate(id,req.body,{
            new:true
        });

        res.status(201).json(updatestud);

    } catch (error) {
        res.status(422).json(error);
    }
})
module.exports=router;