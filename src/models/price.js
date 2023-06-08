const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/dbconection");
const Model = require("./model");
const Year = require("./year");

const Price = db.define("prices", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    model_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            async validateModelExists(value) {
                const model = await Model.findOne({
                    where: { name: value },
                });
                if (!model) throw new Error("model does not exist");
            },
        },
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "models",
            key: "id",
        },
    },
    year_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "years",
            key: "id",
        },
    },
});

Price.associate = (models) => {
    Price.belongsTo(models.Model, { foreignKey: "model_id", as: "models" });
    Price.belongsTo(models.Year, { foreignKey: "year_id", as: "years" });
};

module.exports = Price;
