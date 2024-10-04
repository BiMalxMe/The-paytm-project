import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Headers } from "../components/Headers"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export const Signup = () => {
  const [firstName,setfirstName]=useState('')
  const [lastName,setlastName]=useState('')
  const [userName,setuserName]=useState('')
  const [password,setpassword]=useState('')
  const navigate=useNavigate()


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Headers label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e=>{
          setfirstName(e.target.value)
        }}placeholder="John" label={"First Name"} />
        <InputBox onChange={e=>{
        setlastName(e.target.value)
        }
        }placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e=>{
          setuserName(e.target.value)
        }}placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{
          setpassword(e.target.value)
        }}placeholder="123456" label={"Password"} />
        <div className="pt-4 hover:cursor-pointer">
          <Button label={"Sign up"} onClick={async()=>{
            const response=await axios.post('http://localhost:3000/api/v1/user/signup',{
              firstName,
              lastName,
              userName,
              password
            });
          localStorage.setItem("token",response.data.token)
          if(response.data.token){
            navigate('/signin')
          }
          }
          }/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}