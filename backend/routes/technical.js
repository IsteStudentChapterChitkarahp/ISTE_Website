const express = require('express');
const router = express.Router();
const zod = require('zod');
const {Event} = require("../models/eventSchema");
const {auth} = require("../middleWare/auth");

const eventSchema = zod.object({
    name: zod.string(),
    venue: zod.string(),
    description: zod.string(),
    speaker: zod.string(),
    status: zod.enum(["completed", "upcoming"]),
    photoUrl: zod.string().url(),
    createdBy: zod.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    eventDate : zod.date()
});

router('/eventManger',auth, async(req,res)=>{
    try{
        const { success, data, error } = eventSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({message: "Invalid input", error: error.errors});
        }

        const event = await Event.create(data);
        res.status(201).json({ message: "Event created successfully", event });
    } catch(err){
                res.status(500).json({ message: "Server error" });

    }
})

module.exports = router;

