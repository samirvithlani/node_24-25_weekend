const mongoose = require("mongoose")
const Schema = mongoose.Schema; //class

const userSchema = new Schema({
    //fields.. post. api
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    hobbies:[
        {
            type:String
        }
    ],
    bloodGroup:{
        enum:["A+","B+","A-","B-","O"],
        type:String
    },
    // roleId:{
    //     type:Schema.Types.ObjectId,
    //     ref:"role"
    // } //both are same..
    role:{
        type:Schema.Types.ObjectId,
        ref:"role"
    }
},{timestamps:true})
//userSchema  : bind --> database connectd --> users collection
//what if users colelction is not present: it will creat and bind..
module.exports = mongoose.model("users",userSchema)

//db.users.find
//userSchema.find