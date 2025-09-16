const mongoose = require('mongoose');
const validator = require('validator');


const imageGallerySchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true,
        trim: true,
    },
    imageTitle: {
        type: String,
        trim: true,
    },
    photoUrl: {
        type: String,
        required: true,
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

const ImageGallery = mongoose.model('ImageGallery',imageGallerySchema);
module.exports = ImageGallery;