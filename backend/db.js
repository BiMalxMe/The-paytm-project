const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://journeyxbimal:papa9814479922@cluster0.vbila.mongodb.net/paytm')

const userSchema=new mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    password:String
})

const accountSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },balance:{
        type: Number,
        required: true
    }
})
const Account=mongoose.model('Account',accountSchema)
const User=mongoose.model('Users',userSchema)
module.exports={
    User,
    Account
}