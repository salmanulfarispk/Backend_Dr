const Joi = require("joi");

const joiDoctors = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
    experience: Joi.string().required(),
    hospital: Joi.string().required(),
    about: Joi.string().required(),
    
});


const JOIuserShema=Joi.object({
    
    username:Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email().required(),
    password:Joi.string().required(),
 
});

const Joicategorychema=Joi.object({
    categoryname:Joi.string().required(),
    image: Joi.string().required(),
});


module.exports = { joiDoctors,JOIuserShema,Joicategorychema }
