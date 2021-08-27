import mongoose from 'mongoose';
import crypto from 'crypto';

//create new schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },
    salt: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        default: '6126dd8373a871da65e43f41',
        ref:'Role'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    },
    permissions : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Permission'}
    ],
    groups : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Group'}
    ],
}, {timestamps:true})

// virtual
userSchema.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})

// methods
userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if(!password) return '';
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return ''
        }
    },

    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

export default mongoose.model('User', userSchema);