const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://journeyxbimal:papa9814479922@cluster0.vbila.mongodb.net/paytm1')

const userSchema=new mongoose.Schema({
    userName:String,
    firstName:String,
    lastname:String,
    password:String
})

const User=mongoose.model('Users',userSchema)
module.exports={
    User
}