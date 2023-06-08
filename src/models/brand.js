const db = require("../config/dbconection");
const { Sequelize, DataTypes } = require("sequelize");

const Brand = db.define("brands", {
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
            async validateBrandExists(value) {
                const brand = await Brand.findOne({ where: { name: value } });
                if (brand) throw new Error("Brand already exists");
            },
        },
    },
});

Brand.associate = (models) => {
    Brand.hasMany(models.Type, { foreignKey: "brand_id" });
};

module.exports = Brand;
