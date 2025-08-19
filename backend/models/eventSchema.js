const mongoose = require('mongoose');
const validator = require('validator');
const  MONGO_URI  = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const eventSchema = new mongoose.Schema({
    eventNumber: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    venue: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    speaker: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["completed","upcoming"],
    },
    eventDate: {
        type: Date,
        required: true
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL: " + value);
            }
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps: true,
})

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;