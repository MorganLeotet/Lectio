import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
    "User",
    {
        id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },

        mail: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        },

        name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        },

        password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: true,
        underscored: true,
    }
);

export default User;