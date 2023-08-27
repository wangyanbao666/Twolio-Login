import express from "express"
import RegisterService from "./RegisterService.js"
import dotenv from "dotenv"
import cors from "cors"
import AuthenticationService from "./AuthenticationService.js"
dotenv.config()
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.post("/register", async (req, res)=>{
    let userInfo = req.body
    let result = await RegisterService.register(userInfo)
    res.send(result)
})
app.post("/verification/verify", async (req, res) => {
    let userInfo = req.body
    let result = await AuthenticationService.verify(userInfo.phoneNum, userInfo.otpCode)
    res.send(result)
})

app.post("/login", async (req, res) => {
    let userInfo = req.body
    let result = await RegisterService.login(userInfo)
    res.send(result)
})

app.post("/verification/resend", async (req, res) => {

})

app.listen(3000, ()=>{
    console.log("server is up")
})

