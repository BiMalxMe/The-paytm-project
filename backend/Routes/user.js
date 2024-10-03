const express=require('express')
const router=express.Router()
const z=require('zod')
const jwt=require('jsonwebtoken')
const { User ,Account } = require('../db')
const { JWTToken } = require('../config')
const {authMiddleware} = require('../middleware')

const zodSchemasignup=z.object({
    userName:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string()
})

router.post('/signup',async (req,res)=>{
    const body=req.body
    const {success}=zodSchemasignup.safeParse(body)
    if(!success){
        return res.json({
            msg:'There was a Error / Invalid Values'
        })
    }
    const ExistingUser=await User.findOne({
        userName:req.body.userName
    })
    if(ExistingUser){
        return res.json({
            msg:'Username already exists'
        })
    }
    const dbUser=await User.create({
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userID=dbUser._id
    await Account.create({
        userID,
        balance: 1 + Math.random() * 10000
    })
    const token=jwt.sign({
        userID:dbUser._id
    },JWTToken)
    res.json({
        msg:'User Created Sucessfully',
        token:token
    })
})

const zodSchemasignin=z.object({
    userName:z.string().email(),
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
    const user=await User.findOne({
        userName:body.userName,
        password:body.password
    })
    if(user){
        const token=jwt.sign({
            userID:user._id
        },JWTToken)
        res.json({
            msg:'Signin Sucessfull',
            token:token
    })
    return;
    }
    res.json({
        msg:'Error while Logging in'
    })

})



// other auth routes

const updateBody=z.object({
    userName:z.string().email().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().optional()
})


router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    else{
	await User.updateOne({ _id: req.userID }, req.body)
    .then(
        res.json({
            message: "Updated successfully"
        })
    )
}

})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports= router
