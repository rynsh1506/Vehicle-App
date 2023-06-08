const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/dbconection");

const Year = db.define("years", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            async validateYearExists(value) {
                const year = await Year.findOne({ where: { year: value } });
                if (year) throw new Error("Year already exists");
            },
        },
    },
});

Year.associate = (models) => {
    Year.hasMany(models.Price, { foreignKey: "year_id" });
};

module.exports = Year;
