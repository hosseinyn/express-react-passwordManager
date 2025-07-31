import express from "express";
import { User } from "../models/models.js";
import jwt from "jsonwebtoken"

import { generatePassword } from "../utils/passwordBcrypt.js";
import { checkPassword } from "../utils/passwordBcrypt.js";
import { verifyJwtToken } from "../middlewares/jwtMiddleware.js";

let auth_router = express.Router()

auth_router.use(express.json())

auth_router.post("/register" , async function (req , res){
    let hashed_password = await generatePassword(req.body.password)
    console.log("hashed password : " , hashed_password)
    try{
        await User.create({
            username : req.body.username,
            password : hashed_password,
        })
        res.json({"message" : "User created successfully"})
    } catch (error){
        res.json({"error" : error})
    }
})

auth_router.post("/login" , async function (req , res){
    try{
        const user = await User.findOne({ where: { username: req.body.username } });
            if (user != null && await checkPassword(req.body.password , user.password)){
                const token = jwt.sign({ username: user.username }, 'your-secret-key', {
                expiresIn: '15m',
                });
                res.json({"token" : token})
            } else {
                res.json({"error" : "Username or password is not correct"})
            }
    } catch (error){
        res.json({"error" : error})
    }
})

auth_router.post("/change-password" , verifyJwtToken , async function (req , res) {
    try{
        const user = await User.findOne({ where : {username : req.username } })
        if (user != null && await checkPassword(req.body.current_password , user.password)){
            let new_hashed_password = await generatePassword(req.body.new_password);
            user.password = new_hashed_password;
            await user.save()
            res.json({"message" : "Password updated successfuly"})
        }
    } catch (error){
        res.json({"error" : error})
    }
})

auth_router.delete("/delete-account" , verifyJwtToken , async function (req , res) {
    try{
        const user = await User.findOne({ where : {username : req.username } })

        await user.destroy()

        res.json({"message" : "User deleted successfuly"})
    } catch (error){
        res.json({"error" : error})
    }
})

export {auth_router};