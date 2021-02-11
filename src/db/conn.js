const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myRegister",{
    useNewUrlParser:true,
    useFindAndModify:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(() =>console.log('connection successFul...'))
.catch(() =>console.log('connection failed'))