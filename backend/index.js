const express = require("express");
const cors = require("cors"); // Import the cors package
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
app.use(cors()); // Use CORS middleware
app.use(express.json());

app.post("/register", async (req, resp) => { // register api
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result);
});

app.post("/login", async (req,resp) => { // login api
     if(req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if(!user) {
            resp.send("No user Found")
        } else {
           resp.send(user)
        }
     } else {
         resp.send("No user found")
     }
    
})

app.post("/add-product",async(req,resp) => {  // this is an api for adding a product
      let product = new Product(req.body);
      let result = await product.save();
      result = result.toObject();
      resp.send(result)
})

app.get("/products",async (req,resp) => {  // this is an api for listing the products
    let products = await Product.find();
    if(products.length > 0) {
        resp.send(products);
    } else {
          resp.send({result: "No Products found"})
    }
})

app.delete("/product/:id",async  (req,resp) => {
      const result = await Product.deleteOne({_id:req.params.id});
      resp.send(result);
})

app.get("/product/:id",async (req,resp) => {  // this is an api for getting product id of a user
     let result = await Product.findOne({_id:req.params.id});
     if(result) {
        resp.send(result)
     } else {
         resp.send({result:"No Record Found."})
     }
})

app.put("/product/:id",async (req,resp) => { 
        let  result = await Product.updateOne(
             {_id:req.params.id},
             {
                $set: req.body
             }
        )
        resp.send(result)
});

app.get("/search/:key", async (req, resp) => {
    try {
        const result = await Product.find({
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { company : {$regex: req.params.key}},
                {category : {$regex: req.params.key}}
            ]
        });
        resp.send(result);
    } catch (error) { 
        resp.status(500).send({ error: 'Something went wrong' });
    }
});          

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
