const mongoose = require("mongoose");
const employeeSchema =new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    middlename:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    country_code:{
        type:Number,
        required:true,
        
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    Current_Address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    psw:{
        type:String,
        required:true
    },
    psw_repeat:{
        type:String,
        required:true
    }


})
const Register = new mongoose.model("Register",employeeSchema);
module.exports = Register;