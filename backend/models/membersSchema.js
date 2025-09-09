const mongoose = require('mongoose');
const validator = require('validator');
const  MONGO_URI  = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const membersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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
    photoUrl: {
        type: String,
        default: "https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL: " + value);
            }
        }
    },
    phoneNumber: {
    type: String,
    required: true,
    validate(value) {
        if (!validator.isMobilePhone(value, 'any')) {
            throw new Error("Invalid phone number: " + value);
        }
    }
},
section:{
    type: String,
    required: true
},
year: {
    type: String,
    required: true,
},
studentId: {
    type: Number,
    required: true
}


},{
    timestamps: true,
})

const Members = mongoose.model('Members',membersSchema);
module.exports = Members;