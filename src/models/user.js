const { DataTypes } = require("sequelize");
const db = require("../config/dbconection");
const jwt = require("jsonwebtoken");

const User = db.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            async validateUsername(value) {
                const regex = /^[a-zA-Z0-9_]{4,}$/;
                if (!regex.test(value)) {
                    throw new Error("Invalid username format");
                }
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

User.prototype.getJwtToken = function () {
    return jwt.sign({ email: this.email }, process.env.JWT_KEY);
};

module.exports = User;
