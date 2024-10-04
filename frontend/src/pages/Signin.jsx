import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Headers } from "../components/Headers"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
  const navigate=useNavigate()
  async function main(){
  const response=await axios.post('http://localhost:3000/api/v1/user/signin',{
    userName,
    password
  })
  if(response.data.token){
    navigate('/dashboard')
  }
}


  const [userName,setuserName]=useState('')
  const [password,setpassword]=useState('')
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Headers label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{
          setuserName(e.target.value)
        }} placeholder="bimal@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{
          setpassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={main}label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}