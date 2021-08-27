import mongoose from 'mongoose';
import crypto from 'crypto';

//create new schema
const noticeSchema = new mongoose.Schema({
    caption: {
        type: String,
        trim: true,
        required: true,
        max: 255
    },
    content: {
        type: String,
        trim: true,
        required: true,
        max: 510
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,ref:'User'
    },
    date: {
        type: Date,
        default: Date.now()
    }
    
})
 

export default mongoose.model('Notice', noticeSchema);