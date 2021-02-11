const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const bcrypt = require("bcryptjs")
const hbs = require("hbs")
require("./db/conn");
const Register = require("./models/register");
// const path = require("path");
const public = path.join(__dirname,'../public');
const templatesViews = path.join(__dirname,'../templates/views');
const templatesPartials = path.join(__dirname,'../templates/partials')
console.log(templatesViews)
// express json
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app use
app.use(express.static(public))
// app set
app.set("view engine","hbs");
app.set("views", templatesViews);
hbs.registerPartials(templatesPartials)

// get part
// home page part
app.get('/',(req,res) =>{
res.render('index')
});
app.get('/register', (req,res) =>{
    res.render('register')
})
app.get('/login',(req,res) =>{
    res.render('login')
})
// post part
app.post('/register', async (req,res) =>{
    try{
const password = req.body.password;
const cpassword = req.body.cpassword;
if(password === cpassword){
    const userEmpoly = new Register({
        fname : req.body.fname,
        lname : req.body.lname,
        email:req.body.email,
        age : req.body.age,
        phone: req.body.phone,
        gender : req.body.gender,
        password:req.body.password,
        cpassword:req.body.cpassword
    });
    // jwt tokens
    // console.log(userEmpoly)
    const token = await userEmpoly.genrateAuthToken();
    // console.log(token);
    const user = await userEmpoly.save();
    res.status(201).render('index')
}else{
    res.status(500).send('password incarrect')
}   
}catch(e){
    res.status(500).send('registration failed')
console.log(e)
    }
})
// login
app.post('/login', async (req,res) =>{
  try{
    const email = req.body.email;
    const password = req.body.password;
    const userEmail = await Register.findOne({email:email});
    const isMatch = await bcrypt.compare(password,userEmail.password)
    if(isMatch){
        res.status(200).render('index')
    }else{
        res.status(500).send('password incarectt')
    }
  }catch(e){
      res.status(500).send('login faild...' + e)
  }
    
})

app.get('/',(req,res) =>{
    res.send('Hello wolrd')
}) ;
// listening part
app.listen(port, () => console.log(`this port no ${port}`))
