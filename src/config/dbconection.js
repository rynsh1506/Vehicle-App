const { Sequelize } = require("sequelize");

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    port: PGPORT,
    dialect: "postgres",
});

module.exports = sequelize;
