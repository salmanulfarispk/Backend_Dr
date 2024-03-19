const {JOIuserShema}=require("../models/validateDoctorSchema")
const bcrypt= require("bcrypt")
const UserSchema=require("../models/UserSchema")
const jwt=require("jsonwebtoken")
const DoctorSchema = require("../models/DoctorSchema")



module.exports={

     //UserRegistaration
     Register: async(req,res)=>{

          const {value,error}= JOIuserShema.validate(req.body);
          if(error){
            return res.status(404).json({
                status:"error",
                message:"invalid user input data.please check the data"
            })
          }
          try{
            const {username,email,password}=value;

            const hashingPassword= await bcrypt.hash(password, 12)

            await UserSchema.create({
                username,
                email,
                password:hashingPassword
            })
            
            return res.status(201).json({
                status:"success",
                message:"User Registered Successfully"
            });

          }catch(error){
            console.error("Error occurred during user registration:", error);
            return res.status(500).json({
            status: "error",
            message: "Internal server error."
        });
    }
          

     },

     //Login

     Login:async(req,res)=>{
        const {value,error}= JOIuserShema.validate(req.body)
        if(error){
            return res.json(error.message)
        }
         const {email,password}=value;
         const user= await UserSchema.findOne({
            email:email
         })

         const userid=user.id;
         const username=user.username;
         

         if(!user){
            return  res.status(400).json({
                status:"error",
                message:"user not found"
            })
         }

         if(!password || !user.password){
            return res.status(400).json({
                status:"error occured",
                message:"invalid input"
             })
         }

         const passwordmatching=await bcrypt.compare(password,user.password)
         if(!passwordmatching){
            return res.status(401).json({
                status:"error ",
                message:"incorrect password"
             })
         }

         const token= jwt.sign(
            {email:user.email},
            process.env.USER_ACCES_TOKEN_SECRET,{expiresIn:9500})


            return res.status(200).json({
                status:"success",
                message:"Login succesful",
                data:{userid,email,token,username} 
            })   
  
     },  
    

     //DoctorsByCategory

     DocCategory: async(req,res)=>{

        const Doccategory=req.params.categoryname;
        const DoctorBYCategory= await DoctorSchema.findOne({category:Doccategory})

        if(!DoctorBYCategory){
            return res.status(404).json({
                status:"error",
                message:"Doctors not found in this Category"
             })
        }

        return res.status(200).json({
            status:"success",
            message:"Doctor founded sucesfuly",
            data: DoctorBYCategory
         })


     },

     //SearchByCategory


     SearchCategory:async(req,res)=>{
            try {
                const category = req.params.categoryname;

                const search = new RegExp(category, 'i'); 
                const matchedDoctors = await DoctorSchema.find({ category: { $regex: search } });
        

                if (matchedDoctors.length === 0 || matchedDoctors.length > category.length) {
                    return res.status(404).json({
                        status: "error",
                        message: `This '${category}' not found in the category list`
                    });
                }

                

                return res.status(200).json({
                    status:"succeess",
                    data:matchedDoctors
                });


            } catch (error) {
                console.error(error);
                return res.status(500).json(
                    { message: 'Server Error' 
                });
            }

        },  



        







}