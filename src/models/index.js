require("../config/syncDatabase");

const Brand = require("./brand");
const Type = require("./type");
const Model = require("./model");
const Price = require("./price");
const Year = require("./year");
const User = require("./user");

// Membuat objek yang berisi semua model
const models = {
    Brand,
    Type,
    Model,
    Price,
    Year,
    User,
};

// Membuat asosiasi antar model jika diperlukan
Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = models;
