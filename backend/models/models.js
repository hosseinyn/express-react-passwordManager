import { DataTypes } from "sequelize";
import { database_sequelize } from "../database/database.js";

const User = database_sequelize.define("Users" , {
    username: {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type: DataTypes.STRING,
        allowNull : false,
    }
})

const Password = database_sequelize.define("Passwords" , {
    service : {
        type: DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

User.hasMany(Password, {
  foreignKey: 'username',
  sourceKey: 'username',
  onDelete: 'CASCADE'
});

Password.belongsTo(User, {
  foreignKey: 'username',
  targetKey: 'username'
});

export { User };
export { Password };