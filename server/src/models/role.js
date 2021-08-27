import mongoose from 'mongoose';
import crypto from 'crypto';

//create new schema
const roleSchema = new mongoose.Schema({
    role_name: {
        type: String,
        trim: true,
        required: true,
        max: 255
    },
    permissions : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Permission'}
    ],
    users : [
        {type: mongoose.Schema.Types.ObjectId,ref:'User'}
    ]
})
 

export default mongoose.model('Role', roleSchema);