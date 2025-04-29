import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
        enum: [
            'male',
            'female',
            'binary',
            'non-binary',
            'genderqueer',
            'genderfluid',
            'agender',
            'bigender',
            'pangender',
            'two-spirit',
            'demiboy',
            'demigirl',
            'androgynous',
            'neutrois',
            'third-gender',
            'intergender',
            'cisgender',
            'transgender'
          ]
    },
    profilePic: {
        type: String,
        default: "",
    }
},{timestamps: true})

const User = mongoose.model('User',userSchema)
export default User;