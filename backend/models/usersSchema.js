const mongoose = require('mongoose');
const validator = require('validator');
const  MONGO_URI  = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    photoUrl: {
        type: String,
    default: "https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL: " + value);
            }
        }
    },
    status:{
        type: String,
        enum: ["active", "alumni", "inactive"]
    },
    description: {
        type: String,
    }
},{
    timestamps: true,
})

const User = mongoose.model('User',userSchema);
module.exports = User;