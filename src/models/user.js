const { DataTypes } = require("sequelize");
const db = require("../config/dbconection");
const jwt = require("jsonwebtoken");

const User = db.define("users", {
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
        allowNull: false,
        defaultValue: false,
    },
});

User.prototype.getJwtToken = function () {
    return jwt.sign({ email: this.email }, process.env.JWT_KEY);
};

module.exports = User;
