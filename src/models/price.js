const { DataTypes } = require("sequelize");
const db = require("../config/dbconection");

const Price = db.define("prices", {
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Price.associate = (models) => {
    Price.belongsTo(models.Model, { foreignKey: "model_id" });
    Price.belongsTo(models.Year, { foreignKey: "year_id" });
};

module.exports = Price;
