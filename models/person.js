const mongoose = require('mongoose');
const bcrypt=require('bcrypt');


// Define the person schema
 const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salary:{
        type:Number,
        required:true
    }, 
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
 });
 personSchema.pre('save',async function (next) {
const person=this;

// hash the password only if it has modified(or is new)
if(!person.isModified('password')) return next();

    try{
// hash password genrate
const salt =await bcrypt.genSalt(10);

// hash password
const hashPassword = await bcrypt.hash(person.password,salt )

// override the plain password with the hashed one 
person.password=hashPassword;
        next();
    }catch(err){
return next(err);
    }
 })

 personSchema.methods.comparePassword = async function(candidatePassword){
    // personSchema.methods.comparePassword = async function (candidatePassword) {
    //     return await bcrypt.compare(candidatePassword, this.password);
    // };

try{
const isMatch=await bcrypt.compare(candidatePassword,this.password)
return isMatch;
}catch(err){
    throw err;
} 
 }
 // Create person model
const Person = mongoose.model('Person',personSchema);
module.exports=Person;

