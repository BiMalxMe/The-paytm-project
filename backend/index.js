const express = require("express");
const mainRouter = require("./Routes/index");
const cors = require("cors");
const app = express();
app.use(cors({
    origin:['https://deploy-The-paytm-project.vercel.app'],
    methods:["POST","GET"],
    credentials:true
}));
app.use(express.json());
app.use("/api/v1", mainRouter);
app.listen(3000,()=>{console.log("Starting the server")});
