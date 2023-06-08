const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/dbconection");
const Type = require("./type");

const Model = db.define("models", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            async validateTypeExists(value) {
                const model = await Model.findOne({ where: { name: value } });
                if (model) throw new Error("Model already exists");
            },
        },
    },
    type_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            async validateTypeExists(value) {
                const type = await Type.findOne({ where: { name: value } });
                if (!type) throw new Error("Type does not exist");
            },
        },
    },
    type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "types",
            key: "id",
        },
    },
});

Model.associate = (models) => {
    Model.belongsTo(models.Type, { foreignKey: "type_id" });
    Model.hasMany(models.Price, { foreignKey: "model_id" });
};

module.exports = Model;
