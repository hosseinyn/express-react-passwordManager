import express from "express";
import {auth_router} from "./routes/auth.js";
import { passwords_router } from "./routes/passwords.js";
import {database_sequelize} from "./database/database.js"
import cors from "cors"

let app = express()

app.use(cors())

app.use("/auth" , auth_router)
app.use("/passwords" , passwords_router)

database_sequelize.sync()
app.listen(4001)