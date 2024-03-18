const mongoose=require("mongoose")



  const DocSchema= new mongoose.Schema({
    
      name:String,
      image:String,
      category:String,
      experience:String,
      hospital:String,
      about:String,




  })

  module.exports= mongoose.model("Doctors",DocSchema)