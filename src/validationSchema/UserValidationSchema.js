const zod = require('zod');

// name:{
//     type:String,
//     required:true
// },
// age:{
//     type:Number
// },
// gender:{
//     type:String
// },
// isActive:{
//     type:Boolean,
//     default:true
// },
// hobbies:[
//     {
//         type:String
//     }
// ],
// bloodGroup:{
//     enum:["A+","B+","A-","B-","O"],
//     type:String
// },
// // roleId:{
// //     type:Schema.Types.ObjectId,
// //     ref:"role"
// // } //both are same..
// role:{
//     type:Schema.Types.ObjectId,
//     ref:"role"
// }
const userValidationSchema = zod.object({
    name: zod.string().min(2, { message: 'Name must be at least 2 characters long' }),
    age:zod.number().min(1, { message: 'Age must be at least 1' }),
    gender:zod.string(),
    isActive:zod.boolean(),
    hobbies:zod.array(zod.string()),
    bloodGroup:zod.enum(["A+", "B+", "A-", "B-", "O"]),
    role:zod.string()

}).strict(); //strict() will not allow any extra fields
module.exports = userValidationSchema