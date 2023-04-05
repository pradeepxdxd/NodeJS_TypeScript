import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document{
    name : String;
    email : String;
    password : String;
    phone : Number;
}

interface User {
    name : String;
    email : String;
    password : String;
    phone : Number;
}

const userSchema = new mongoose.Schema<User>({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
});

export const userModel = mongoose.model<User>("User", userSchema);
