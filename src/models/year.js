const { DataTypes } = require("sequelize");
const db = require("../config/dbconection");

const Year = db.define("years", {
    year: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Year.associate = (models) => {
    Year.hasMany(models.Price, { foreignKey: "year_id" });
};

module.exports = Year;
