const express=require('express')
const router=express.Router()
const {authMiddleware}=require('../middleware');
const { Account } = require('../db');
const { mongoose } = require('mongoose');


router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});


router.post('/transfer',authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession();
    try{
    session.startTransaction()
     const {amount,to}=req.body;

     const account=await Account.findOne({userID:req.userID}).session(session)
    if(!account || account.balance<amount){
       await session.abortTransaction()
       return res.status(400).json({
        msg:'Insufficient balance please refil the balance'
       })
    }
    const toAccount=await Account.findOne({userID:to}).session(session)
    if(!toAccount){
         await session.abortTransaction()
        return re.json({
            msg:'Invalid Account'
        }).status(400)
    }

    //perform the main transaction

    await Account.updateOne({userID:req.userID},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userID:to},{$inc:{balance:amount}}).session(session)

    session.commitTransaction()
    res.json({
        message: "Transfer successful"
    });
    }catch(err){
        res.status(400).json({
            msg:'Somrthings up with the server'
        })
    }
})
module.exports=router