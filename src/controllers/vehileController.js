const Brand = require("../models/brand");
const Model = require("../models/model");
const Price = require("../models/price");
const Type = require("../models/type");
const Year = require("../models/year");

exports.createVehicleEntity = async (req, res, next) => {
    try {
        const { entities } = req.body;

        // Iterate through each entity
        for (const entity of entities) {
            const {
                field,
                name_brand,
                name_type,
                name_model,
                year,
                price,
                brand_id,
                type_id,
                model_id,
                year_id,
            } = entity;

            switch (field) {
                case "brand":
                    // Buat brand baru
                    const newBrand = await Brand.create({ name: name_brand });
                    console.log("Brand created:", newBrand);
                    break;
                case "type":
                    // Buat type baru
                    const newType = await Type.create({
                        name: name_type,
                        brand_id,
                    });
                    console.log("Type created:", newType);
                    break;
                case "model":
                    // Buat model baru
                    const newModel = await Model.create({
                        name: name_model,
                        type_id,
                    });
                    console.log("Model created:", newModel);
                    break;
                case "price":
                    // Buat price baru
                    const newPrice = await Price.create({
                        price: price,
                        model_id: model_id,
                        year_id: year_id,
                    });
                    console.log("Price created:", newPrice);
                    break;
                case "year":
                    // Buat year baru
                    const newYear = await Year.create({ year: year });
                    console.log("Year created:", newYear);
                    break;
                default:
                    console.log("Invalid entity field:", field);
            }
        }
        res.status(201).json({
            message: "Vehicle entities created successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create vehicle entities" });
    }
};

exports.updateVehicleEntity = async (req, res, next) => {
    try {
        const { entities } = req.body;

        for (const entity of entities) {
            const {
                field,
                name_brand,
                name_type,
                name_model,
                year,
                year_id,
                price,
                type_id,
                brand_id,
                type_brand_id,
                model_id,
                model_type_id,
                price_id,
                price_model_id,
                price_year_id,
            } = entity;

            switch (field) {
                case "brand":
                    // Update brand
                    await Brand.update(
                        { name: name_brand },
                        { where: { id: brand_id } }
                    );
                    break;
                case "type":
                    // Update type
                    await Type.update(
                        { name: name_type },
                        { where: { id: type_id, brand_id: type_brand_id } }
                    );
                    break;
                case "model":
                    // Update model
                    await Model.update(
                        { name: name_model },
                        { where: { id: model_id, type_id: model_type_id } }
                    );
                    break;
                case "price":
                    // Update price
                    await Price.update(
                        { price },
                        {
                            where: {
                                id: price_id,
                                model_id: price_model_id,
                                year_id: price_year_id,
                            },
                        }
                    );
                    break;
                case "year":
                    // Update year
                    await Year.update({ year }, { where: { id: year_id } });
                    break;
                default:
                    console.log("Invalid entity field:", field);
            }
        }

        res.status(200).json({
            success: true,
            message: "Vehicle entities updated successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update vehicle entities" });
    }
};

exports.getVehicleBrands = async (req, res, next) => {
    try {
        const { name, limit = 10, skip = 0 } = req.query;

        const { count, rows } = await Brand.findAndCountAll({
            where: { name },
            limit: parseInt(limit),
            offset: parseInt(skip),
        });

        res.status(200).json({
            total: count,
            limit: parseInt(limit),
            skip: parseInt(skip),
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch vehicle brands" });
    }
};

exports.getVehicleTypesByBrand = async (req, res, next) => {
    try {
        const { brand_id, limit = 10, skip = 0 } = req.query;

        const { count, rows } = await Type.findAndCountAll({
            where: { brand_id },
            limit: parseInt(limit),
            offset: parseInt(skip),
        });

        res.status(200).json({
            total: count,
            limit: parseInt(limit),
            skip: parseInt(skip),
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch vehicle types" });
    }
};

exports.getVehicleModelsByType = async (req, res, next) => {
    try {
        const { type_id, limit = 10, skip = 0 } = req.query;

        const { count, rows } = await Model.findAndCountAll({
            where: { type_id },
            limit: parseInt(limit),
            offset: parseInt(skip),
        });

        res.status(200).json({
            total: count,
            limit: parseInt(limit),
            skip: parseInt(skip),
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch vehicle models" });
    }
};

exports.getVehiclePricesByModelAndYear = async (req, res, next) => {
    try {
        const { model_id, year_id, limit = 10, skip = 0 } = req.query;

        const { count, rows } = await Price.findAndCountAll({
            where: { model_id, year_id },
            limit: parseInt(limit),
            offset: parseInt(skip),
        });

        res.status(200).json({
            total: count,
            limit: parseInt(limit),
            skip: parseInt(skip),
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch vehicle prices" });
    }
};

exports.getVehicleYears = async (req, res, next) => {
    try {
        const { limit = 10, skip = 0 } = req.query;

        const { count, rows } = await Year.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(skip),
        });

        res.status(200).json({
            total: count,
            limit: parseInt(limit),
            skip: parseInt(skip),
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch vehicle years" });
    }
};

// exports.getFilteredVehicles = async (req, res, next) => {
//     try {
//         const { brand_id, type_id, model_id, year_id } = req.query;
//         let filteredVehicles = [];

//         if (brand_id) {
//             filteredVehicles = await Brand.findAll({
//                 where: { id: brand_id },
//                 include: [
//                     {
//                         model: Type,
//                         as: "types",
//                         where: type_id ? { id: type_id } : {},
//                         include: [
//                             {
//                                 model: Model,
//                                 as: "models",
//                                 where: model_id ? { id: model_id } : {},
//                                 include: [
//                                     {
//                                         model: Price,
//                                         as: "prices",
//                                         where: year_id ? { year_id } : {},
//                                     },
//                                 ],
//                             },
//                         ],
//                     },
//                 ],
//             });
//         }

//         res.status(200).json(filteredVehicles);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch filtered vehicles" });
//     }
// };
