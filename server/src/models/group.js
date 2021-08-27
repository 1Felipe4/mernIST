import mongoose from 'mongoose';
import crypto from 'crypto';

//create new schema
const groupSchema = new mongoose.Schema({
    group_name: {
        type: String,
        trim: true,
        required: true,
        max: 255
    },
    users : [
        {type: mongoose.Schema.Types.ObjectId,ref:'User'}
    ]
})
 

export default mongoose.model('Group', groupSchema);