import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content : string,
    createdAt : Date
}


const messageSchema : Schema <Message> = new mongoose.Schema({

    content : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    }
})


export interface User extends Document{
    userName : string,
    email : string,
    password : string,
    verifyCode : string,
    verifyCodeExpiry : Date,
    isVerified : boolean,
    isAcceceptingMessage : boolean,
    message : Message[]
}



const UserSchema : Schema <User> = new mongoose.Schema({

    userName : {
        type : String,
        required : [true, "userName is required", ],
        trim : true,
        unique : true
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ /,"please use a valid email address"]
        
    },
    verifyCode : {
        type : String,
        required : [true, "Verify Code is required"],   
    },
    verifyCodeExpiry : {
        type : Date,
        required : [true, "verifyCodeExpiry is required"],   
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAcceceptingMessage : {
        type : Boolean,
        default : true
    },
    message :[messageSchema]
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel