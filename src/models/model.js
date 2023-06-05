const { DataTypes } = require("sequelize");
const db = require("../config/dbconection");

const Model = db.define("models", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Model.associate = (models) => {
    Model.belongsTo(models.Type, { foreignKey: "type_id" });
    Model.hasMany(models.Price, { foreignKey: "model_id" });
};

module.exports = Model;
