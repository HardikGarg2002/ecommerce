const express = require('express');
const app = express();
require("dotenv").config();
const PORT =process.env.PORT || 5000;

const router1=require('./routes/productRoute');
const router2=require('./routes/adminRoute');



app.get("/", (req, res) => {
    res.send("Hello World");
  });

app.use('/',router1);
 app.use('/',router2);
//app.use('/admin',router2);


app.listen(PORT,()=>{
    console.log("listening at port",PORT);
})