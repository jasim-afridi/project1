require("dotenv").config()
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const registerSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
  tokens:[{
      token:{
          type:String,
          required:true
      }
  }]
});
// jwt Authtoken
//  bcrypt part
registerSchema.methods.genrateAuthToken = async function(){
    try{
const token = jwt.sign({_id:this._id.toString()}, 'dadasdsadsagfrgdfgwerwesadsadsadsrwerwerew');
this.tokens = this.tokens.concat({token:token});
await this.save();
return token;
    }catch(e){
console.log('jwt faild...')
    }
}

registerSchema.pre("save", async function(next){
  
if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
// this.cpassword = undefined;

}
    next()
})

const Register = new mongoose.model("regiser",registerSchema);

module.exports = Register;