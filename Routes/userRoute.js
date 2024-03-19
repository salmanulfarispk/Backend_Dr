const express=require("express")
const router=express.Router()
const userControler=require("../Controllers/Usercontroller")

const TrycatchHandler=require("../Middlewares/TryCatchHandler")
const verifyToken=require("../Middlewares/userAuth") 



router

.post("/register",TrycatchHandler(userControler.Register))
.post("/login",TrycatchHandler(userControler.Login))


.use(verifyToken)

.get("/:categoryname",TrycatchHandler(userControler.DocCategory))
.get("/search/:categoryname",TrycatchHandler(userControler.SearchCategory))







module.exports=router