const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/dbconection");
const Brand = require("./brand");

const Type = db.define("types", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            async validateBrandExists(value) {
                const brand = await Brand.findOne({ where: { name: value } });
                if (!brand) throw new Error("Brand does not exist");
            },
        },
    },
    brand_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "brands",
            key: "id",
        },
    },
});

Type.associate = (models) => {
    Type.belongsTo(models.Brand, { foreignKey: "brand_id" });
    Type.hasMany(models.Model, { foreignKey: "type_id" });
};

module.exports = Type;
