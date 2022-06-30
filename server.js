const express = require("express")
const knex = require("./config/databas")
const {createToken, varifiToken} = require("./modulse/JWT")
const app = express()

app.use(express.json())

app.get("/register",(req,res)=>{
    knex("user").where({email:req.body.email}).then((result) => {
        if (result.length ==0 ){
            knex("user").insert(req.body).then((result1)=>{
                res.send("inserted")
            })
        }else{
            res.send("already exist")
        }
    })
})

app.get("/login",(req,res)=>{
    knex("user").where({email:req.body.email,password:req.body.password}).then((reslt)=>{
        if (reslt.length == 1){
            let token= createToken(reslt[0])
            res.cookie("Cooki",token)
            res.send("login_ Succecfull") 
        }else{
            res.send("not exist try again")
        }
    })
})

app.get("/product",varifiToken,(req,res)=>{
    knex("product").then((re)=>{
        let arr = []
        for(let i of re){
            arr.push({Name:i.Product_name ,Description:i.Product_description,Price:i.prise,ID:i.id})
        }
        res.send(arr)
    })
})

app.get("/seller",varifiToken,(req,res)=>{
    if (req.userData[0].role == "seller"){
        knex("product").insert({author_id:req.userData[0].id,Product_name:req.body.Product_name,Product_description:req.body.Product_description,prise:req.body.prise,quantity:req.body.quantity}).then((result)=>{
            res.send("Product_insert")
        })
    }else{
        res.send("register as a seller")
    }
})

app.get("/order",varifiToken,async (req,res)=>{
    let arr = req.body.product_id
    let amount = 0
    for(let i of arr){
        let data = await knex("product").where({id:i})
        console.log(data);
        let order = await knex("order").insert({buyer_id:req.userData[0].id,product_id:i,product_name:data[0].Product_name})
        console.log(order.error);
        amount=amount+Number(data[0].price)
        console.log(data[0].price);
    }
    console.log(amount);
    res.send(`your final amount is ${amount}`)
})


app.listen(2030,()=>{
    console.log("connected");
})