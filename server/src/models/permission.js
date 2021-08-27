import mongoose from 'mongoose';
import crypto from 'crypto';

//create new schema
const permissionSchema = new mongoose.Schema({
    permission_name: {
        type: String,
        trim: true,
        required: true,
        max: 255
    },
    permission_code: {
        type: String,
        trim: true,
        required: true,
        max: 255
    }
})
 

export default mongoose.model('Permission', permissionSchema);