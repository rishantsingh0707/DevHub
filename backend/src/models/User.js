import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;