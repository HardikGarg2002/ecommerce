const express=require('express');
// const app = express();
const router2 =express.Router();


router2.post("/admin/addproduct",(req,res)=>{
  
    res.send("succesfully added product")
})


router2.delete("/admin/deleteproduct",(req,res)=>{
  
    res.send("succesfully delete product")
})

router2.patch("/admin/updateproduct",(req,res)=>{
    console.log("function to update the product");
    res.send("updated successfully");
})

router2.delete("/admin/deleteuser",(req,res)=>{
    res.send("user blocked / removed from database");
})


function getProductFromDB(id){
    return {"product1":1}
}
function addProductToDB(product){
    console.log("product added")
}


module.exports = router2;
// product cost 