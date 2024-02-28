import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: [true, 'Please provide name'], 
        trim: true, 
    },
    email:{
        type: String, 
        required: [true, 'Please provide email'],
        validate:{
            validator: validator.isEmail,
            message:'Please provide valid email'
        },
        unique: true, 
    },
    age:{
        type: Number,
        required: [true,'Please provide age']

    }
})

export default mongoose.model('User', UserSchema)
