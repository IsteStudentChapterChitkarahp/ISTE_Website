const mongoose = require('mongoose');
const validator = require('validator');


const eventSchema = new mongoose.Schema({
    totalEvent: {
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
    time: {
      type: String,
      required: true,
      trim: true,
    },
    registrationLink: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Registration Link URL: " + value);
        }
      },
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
});

eventSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const total = await Event.countDocuments();
      this.totalEvent = total + 1;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;