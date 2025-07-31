import express from "express";
import { verifyJwtToken } from "../middlewares/jwtMiddleware.js";
import { User , Password } from "../models/models.js"

let passwords_router = express.Router()

passwords_router.use(express.json())

passwords_router.get("/all-passwords" , verifyJwtToken , async function(req , res) {
    try {
        const all_passwords = await Password.findAll({ where: { userName: req.username } });
        if (all_passwords != null){
            res.json({"Passwords" : JSON.stringify(all_passwords, null, 2)})
        }
    } catch (error){
        res.json({"error" : error})
    }
})

passwords_router.post("/add-password" , verifyJwtToken , async function (req , res) {
    try{
        await Password.create({
            service : req.body.service,
            password : req.body.encrypted_password,
            username : req.username,
        })
        
        res.json({"message" : "Password added successfully"})
    } catch (error){
        res.json({"error" : error})
    }
})

passwords_router.post("/update-password" , verifyJwtToken , async function (req , res) {
    try{
        const passwordObject = await Password.findOne({ where: { id: req.body.id } });
        if (passwordObject != null && passwordObject.username == req.username){
            passwordObject.service = req.body.service,
            passwordObject.password = req.body.new_password,
            passwordObject.username = req.userName

            await passwordObject.save()

            res.json({"message" : "Password updated successfuly"})

        }
        
    } catch (error){
        res.json({"error" : error})
    }
})

passwords_router.delete("/delete-password" , verifyJwtToken , async function (req , res) {
    try{
        const passwordObject = await Password.findOne({ where : {id : req.body.id}})
        if (passwordObject != null && passwordObject.username == req.username){

            await passwordObject.destroy()

            res.json({"message" : "Password deleted successfuly"})
        }

    } catch (error){
        res.json({"error" : error})
    }
})


export { passwords_router };