import { Sequelize , DataTypes } from "sequelize";

const database_sequelize = new Sequelize({
    dialect: "sqlite",
    storage : "./database.sqlite"
})

export {database_sequelize};