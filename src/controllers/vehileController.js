const Brand = require("../models/brand");
const Model = require("../models/model");
const Price = require("../models/price");
const Type = require("../models/type");
const Year = require("../models/year");
const ErrorHandler = require("../utils/ErrorHandler");
const models = require("../models/index");

// post method
exports.createBrand = async (req, res, next) => {
    try {
        const { name } = req.body;
        const brand = await Brand.findOne({ where: { name } });

        if (brand) {
            return next(new ErrorHandler("Brand already exists", 400));
        }

        const newBrand = await Brand.create({ name });

        res.status(201).json({
            message: "Brand created successfully",
            newBrand,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create brand" });
    }
};

exports.createType = async (req, res, next) => {
    try {
        const { name, brand_name } = req.body;
        const brand = await Brand.findOne({ where: { name: brand_name } });

        if (!brand) {
            return next(new ErrorHandler("Brand does not exist", 404));
        }

        const existingType = await Type.findOne({
            where: { name, brand_id: brand.id },
        });

        if (existingType) {
            return next(
                new ErrorHandler("Type already exists for this brand", 400)
            );
        }

        const newType = await Type.create({
            name,
            brand_name,
            brand_id: brand.id,
        });

        res.status(201).json({
            message: "Type created successfully",
            newType,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create type" });
    }
};

exports.createModel = async (req, res, next) => {
    try {
        const { name, type_name } = req.body;

        const model = await Model.findOne({ where: { name } });
        if (model) {
            return next(new ErrorHandler("Model already exists", 400));
        }

        const type = await Type.findOne({ where: { name: type_name } });
        if (!type) {
            return next(new ErrorHandler("Type does not exist", 404));
        }

        const existingModel = await Model.findOne({
            where: { name, type_id: type.id },
        });
        if (existingModel) {
            return next(
                new ErrorHandler("Model already exists for this type", 400)
            );
        }

        const newModel = await Model.create({
            name,
            type_name,
            type_id: type.id,
        });

        res.status(201).json({
            message: "Model created successfully",
            newModel,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create model" });
    }
};

exports.createPrice = async (req, res, next) => {
    try {
        const { price, model_name, year } = req.body;
        const model = await Model.findOne({ where: { name: model_name } });
        let existingYear = await Year.findOne({ where: { year } });

        if (!model) {
            return next(new ErrorHandler("Model does not exist", 404));
        }

        if (!existingYear) {
            existingYear = await Year.create({ year });
        }

        const existingPrice = await Price.findOne({
            where: {
                price,
                model_id: model.id,
                year_id: existingYear.id,
            },
        });

        if (existingPrice) {
            return next(
                new ErrorHandler(
                    "Price with the same model and year already exists",
                    400
                )
            );
        }

        const newPrice = await Price.create({
            price,
            model_name,
            year,
            model_id: model.id,
            year_id: existingYear.id,
        });

        res.status(201).json({
            message: "Price created successfully",
            newPrice,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create price" });
    }
};

exports.createYear = async (req, res, next) => {
    try {
        const { year } = req.body;
        const years = await Year.findOne({ where: { year } });

        if (years) {
            return next(new ErrorHandler("Brand already exists", 400));
        }

        const newYear = await Year.create({ year });

        res.status(201).json({ message: "Year created successfully", newYear });
    } catch (error) {
        res.status(500).json({ error: "Failed to create year" });
    }
};

exports.updateBrandByName = async (req, res, next) => {
    try {
        const { brandName } = req.params;
        const { newName } = req.body;

        const [updatedRows] = await Brand.update(
            { name: newName },
            { where: { name: brandName } }
        );

        if (updatedRows === 0) {
            return next(new ErrorHandler("Brand not found", 404));
        }

        const brand = await Brand.findOne({ where: { name: newName } });

        const [updatedTypeRows] = await Type.update(
            { brand_name: newName },
            { where: { brand_id: brand.id } }
        );

        if (updatedTypeRows === 0) {
            return next(
                new ErrorHandler("No types associated with the brand", 404)
            );
        }

        res.status(200).json({ message: "Brand updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update brand" });
    }
};

exports.updateTypeByName = async (req, res, next) => {
    try {
        const { typeName, brandName } = req.params;
        const { newName } = req.body;

        const updatedRows = await Type.update(
            { name: newName },
            { where: { name: typeName, brand_name: brandName } }
        );

        if (updatedRows === 0) {
            return next(new ErrorHandler("Type or Brand not found", 404));
        }

        const type = await Type.findOne({ where: { name: newName } });

        const [updatedModelRows] = await Model.update(
            { type_name: newName },
            { where: { type_id: type.id } }
        );

        if (updatedModelRows === 0) {
            return next(
                new ErrorHandler("No models associated with the type", 404)
            );
        }

        res.status(200).json({ message: "Type updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update type" });
    }
};

exports.updateModelByName = async (req, res, next) => {
    try {
        const { modelName } = req.params;
        const { newName } = req.body;

        const updatedRows = await Model.update(
            { name: newName },
            { where: { name: modelName } }
        );

        if (updatedRows === 0) {
            return next(new ErrorHandler("Model not found", 404));
        }

        const model = await Model.findOne({ where: { name: newName } });

        const [updatedPrice] = await Price.update(
            { model_name: newName },
            { where: { model_id: model.id } }
        );

        if (updatedPrice === 0) {
            return next(
                new ErrorHandler("No prices associated with the model", 404)
            );
        }

        res.status(200).json({ message: "Model updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update model" });
    }
};

exports.updatePriceByModelAndYear = async (req, res, next) => {
    try {
        const { modelName, year } = req.params;
        const { newPrice } = req.body;

        const updatedRows = await Price.update(
            { price: newPrice },
            { where: { model_name: modelName, year } }
        );

        if (updatedRows[0] === 0) {
            return next(new ErrorHandler("Price not found", 404));
        }

        res.status(200).json({ message: "Price updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update price" });
    }
};

exports.updatePriceYear = async (req, res, next) => {
    try {
        const { modelName, year } = req.params;
        const { newYear } = req.body;

        let yearObj = await Year.findOne({ where: { year: newYear } });

        if (!yearObj) {
            yearObj = await Year.create({ year: newYear });
        }

        const [updatedRows] = await Price.update(
            { year: newYear, year_id: yearObj.id },
            { where: { model_name: modelName, year } }
        );

        if (updatedRows === 0) {
            return next(new ErrorHandler("Price not found", 404));
        }

        res.status(200).json({ message: "Year updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update year" });
    }
};

// delete mothod
exports.deleteBrandByName = async (req, res, next) => {
    try {
        const { brandName } = req.params;

        const deletedRows = await Brand.destroy({
            where: { name: brandName },
        });

        if (deletedRows === 0) {
            return next(new ErrorHandler("Brand not found", 404));
        }

        res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete brand" });
    }
};

exports.deleteTypeByName = async (req, res, next) => {
    try {
        const { typeName, brandName } = req.params;

        const brand = await Brand.findOne({ where: { name: brandName } });

        if (!brand) {
            return next(new ErrorHandler("Brand does not exist", 404));
        }

        const deletedRows = await Type.destroy({
            where: { name: typeName, brand_id: brand.id },
        });

        if (deletedRows === 0) {
            return next(new ErrorHandler("Type not found", 404));
        }

        res.status(200).json({ message: "Type deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete type" });
    }
};

exports.deleteModelByName = async (req, res, next) => {
    try {
        const { modelName } = req.params;

        const deletedRows = await Model.destroy({
            where: { name: modelName },
        });

        if (deletedRows === 0) {
            return next(new ErrorHandler("Model not found", 404));
        }

        res.status(200).json({ message: "Model deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete model" });
    }
};

exports.deletePriceByModelAndYear = async (req, res, next) => {
    try {
        const { modelName, year } = req.params;

        const deletedRows = await Price.destroy({
            where: { model_name: modelName, year },
        });

        if (deletedRows === 0) {
            return next(new ErrorHandler("Price not found", 404));
        }

        res.status(200).json({ message: "Price deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete price" });
    }
};

// get method
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
        const { brand_name, limit = 10, skip = 0 } = req.query;

        const { count, rows } = await Type.findAndCountAll({
            where: { brand_name },
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
        const { type_name, limit = 10, skip = 0 } = req.query;

        const { count, rows } = await Model.findAndCountAll({
            where: { type_name },
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
        const { model_name, year, limit = 10, skip = 0 } = req.query;

        const { count, rows } = await Price.findAndCountAll({
            where: { model_name, year },
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
