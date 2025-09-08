const express = require('express');
const router = express.Router();
const zod = require('zod');
const Event = require("../models/eventSchema");
const auth = require("../middleWare/auth");
const User = require('../models/usersSchema');
const Update = require('../models/updateSchema');
const ImageGallery = require('../models/imageGallerySchema');

const imageGallerySchema = zod.object({
  eventTitle: zod.string(),
  imageTitle: zod.string().optional(),
photoUrl: zod.string().url()
})

router.get("/event/images",async(req,res)=>{
  try{
        const images = await ImageGallery.find().populate("createdBy", "firstName username role");
        console.log(images);
        res.status(200).json(images);
    } catch(err){
        res.status(404).json({message: "Error fetching images...."})
    }
})
router.post("/event/images", auth, async(req,res)=>{
   try{
            const user = await User.findById(req.user._id).select("role");
 if (!["Technical Head", "Event Coordinator", "Faculty"].includes(user.role)) {
      return res.status(403).json({ message: "You are not authorized to add photos" });
    }
    
        const result = imageGallerySchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ message: "Invalid input", error: result.error.errors });
}
const data = result.data;
data.createdBy = req.user._id;

        const images = await ImageGallery.create(data);

    await User.populate("createdBy", "firstName username role");

    console.log(images);
        res.status(201).json({ message: "Images added successfully", images });
    } catch(err){
                res.status(500).json({ message: "Server error" });

    }
})

const eventSchema = zod.object({
    name: zod.string(),
    venue: zod.string(),
    description: zod.string(),
    speaker: zod.string().optional(),
    status: zod.enum(["completed", "upcoming"]),
    photoUrl: zod.string().url().optional(),
    eventDate: zod.preprocess((val) => val ? new Date(val) : undefined, zod.date()),
      time: zod
    .string()
    .regex(/^([0-9]{1,2}):([0-9]{2}) ?(AM|PM)?$/, {
      message: "Invalid time format (use hh:mm AM/PM or hh:mm)",
    }),
  registrationLink: zod.string().url().optional(),
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("role firstName username");
  res.json(user);
});

router.get("/events",async(req,res)=>{
    try{
        const eventsData = await Event.find().populate("createdBy", "firstName username role");
        console.log(eventsData);
        res.status(200).json(eventsData);
    } catch(err){
        res.status(404).json({message: "Error fetching events...."})
    }
})

router.post("/user/eventManager",auth, async (req,res)=>{
    try{
            const user = await User.findById(req.user._id).select("role");
 if (!["Technical Head", "Event Coordinator", "Faculty"].includes(user.role)) {
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



const updateSchema = zod.object({
    type: zod.string(),
    link: zod.string().optional(),
    message: zod.string().optional(),
}).refine(
  (data) => (data.type === "logo" && data.link) || (data.type === "text" && data.message),
  { message: "Link is required for logo, message is required for text" }
);

router.post("/user/updates",auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user._id).select("role");
 if (!["Technical Head", "Event Coordinator", "Faculty"].includes(user.role)) {
      return res.status(403).json({ message: "You are not authorized to create events" });
    }

    const result = updateSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ message: "Invalid input", error: result.error.errors });
}
const data = result.data;
data.createdBy = req.user._id;

        const updates = await Update.create(data);

    await updates.populate("createdBy", "firstName username role");

    console.log(updates);
        res.status(201).json({ message: "Event created successfully", updates});

    } catch(err){
              res.status(500).json({ message: "Server error", error: err.message });
    }
})

router.get("/updates", async(req,res)=>{
    try{
        const updatesData = await Update.find().populate("createdBy", "firstName username role");
        console.log(updatesData);
        res.status(200).json(updatesData);
    } catch(err){
        res.status(404).json({message: "Error error while fetching new updates...."})
    }
})




module.exports = router;

