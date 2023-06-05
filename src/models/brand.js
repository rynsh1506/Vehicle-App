const db = require("../config/dbconection");
const { DataTypes } = require("sequelize");

const Brand = db.define("brands", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Brand.associate = (models) => {
    Brand.hasMany(models.Type, { foreignKey: "brand_id" });
};

module.exports = Brand;
