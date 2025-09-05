const mongoose = require('mongoose');
const validator = require('validator');
const  MONGO_URI  = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const updateSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        // default: "https://play-lh.googleusercontent.com/PhgyB8JGhS6Dl4WI4z6R2nEBUlWoLV7Yk-VHhLiEI5XAfRWmXu5Y2TogfRd8UxC9oPA",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL: " + value);
            }
        }
    },
    message: {
        type: String,
        trim: true,
    },
     createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
},{
    timestamps: true,
})

const Update = mongoose.model('Update',updateSchema);
module.exports = Update;