const { DataTypes } = require("sequelize");
const db = require("../config/dbconection");

const Type = db.define("types", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Type.associate = (models) => {
    Type.belongsTo(models.Brand, { foreignKey: "brand_id" });
    Type.hasMany(models.Model, { foreignKey: "type_id" });
};

module.exports = Type;
