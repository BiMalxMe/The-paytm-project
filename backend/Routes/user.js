const express=require('express')
const router=express.Router()
const z=require('zod')
const jwt=require('jsonwebtoken')
const { User } = require('../db')
const { JWTToken } = require('../config')

const zodSchemasignup=z.object({
    userName:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string()
})

router.post('/signup',async (req,res)=>{

    const body=req.body;
    const {success}=zodSchemasignup.safeParse(body)
    if(!success){
        return res.json({
            msg:'There was a Error / Invalid Values'
        })
    }
    const ExistingUser=User.findOne({
        userName:body.userName
    })
    if(ExistingUser){
        return res.json({
            msg:'Username already exists'
        })
    }
    const dbUser=await User.create(body)
    const token=jwt.sign({
        userID:dbUser._id
    },JWTToken)
    res.json({
        msg:'User Created Sucessfully',
        token:token
    })
})

const zodSchemasignin=z.object({
    userName:x.string().email(),
    password:z.string()
})

router.post('/signin',async (req,res)=>{
    const body=req.body
    const {success}=zodSchemasignin.safeParse(body)
    if(!success){
        return res.status(411).json({
             message: "Email already taken / Incorrect inputs"
        })
    }
    const user=User.findOne({
        userName:body.userName,
        password:body.password
    })
    if(user){
        const token=user.sign({
            userID:user._id
        },JWTToken)
    res.json({
        token:token
    })
    return;
    }
    res.json({
        msg:'Error while Logging in'
    })

})


module.exports={
    router
}