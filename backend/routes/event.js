const express = require('express');
const router = express.Router();
const zod = require('zod');
const Event = require("../models/eventSchema");
const auth = require("../middleWare/auth");
const User = require('../models/usersSchema');

const eventSchema = zod.object({
    name: zod.string(),
    venue: zod.string(),
    description: zod.string(),
    speaker: zod.string().optional(),
    status: zod.enum(["completed", "upcoming"]),
    photoUrl: zod.string().url().optional(),
    eventDate : zod.preprocess((val) => new Date(val), zod.date())
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("role firstName username");
  res.json(user);
});

router.get("/events",async(req,res)=>{
    try{
        const eventsData = await Event.find().populate("createdBy", "firstName username role");
        console.log("evnefff ",eventsData);
        res.status(200).json(eventsData);
    } catch(err){
        res.status(404).json({message: "Error error while fetching events detail...."})
    }
})

router.post("/user/eventManager",auth, async (req,res)=>{
    try{
            const user = await User.findById(req.user._id).select("role");
 if (!["Technical Head", "Event Coordinator"].includes(user.role)) {
      return res.status(403).json({ message: "You are not authorized to create events" });
    }
    
        const result = eventSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ message: "Invalid input", error: result.error.errors });
}
const data = result.data;
data.createdBy = req.user._id;

        const event = await Event.create(data);

    await event.populate("createdBy", "firstName username role");

    console.log(event);
        res.status(201).json({ message: "Event created successfully", event });
    } catch(err){
                res.status(500).json({ message: "Server error" });

    }
})

module.exports = router;

