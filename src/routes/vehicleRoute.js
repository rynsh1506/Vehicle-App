const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehileController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// create enpoint
router.post("/brand", isAuthenticated, isAdmin, vehicleController.createBrand);
router.post("/type", isAuthenticated, isAdmin, vehicleController.createType);
router.post("/model", isAuthenticated, isAdmin, vehicleController.createModel);
router.post("/price", isAuthenticated, isAdmin, vehicleController.createPrice);
router.post("/year", isAuthenticated, isAdmin, vehicleController.createYear);

// update enpoint
router.patch(
    "/brand/:brandName",
    isAuthenticated,
    isAdmin,
    vehicleController.updateBrandByName
);
router.patch(
    "/type/:typeName/:brandName",
    isAuthenticated,
    isAdmin,
    vehicleController.updateTypeByName
);
router.patch(
    "/model/:modelName",
    isAuthenticated,
    isAdmin,
    vehicleController.updateModelByName
);
router.patch(
    "/price/:modelName/:year",
    isAuthenticated,
    isAdmin,
    vehicleController.updatePriceByModelAndYear
);
router.patch(
    "/year/:modelName/:year",
    isAuthenticated,
    isAdmin,
    vehicleController.updatePriceYear
);

// delete endpoint
router.delete(
    "/brand/:brandName",
    isAuthenticated,
    isAdmin,
    vehicleController.deleteBrandByName
);
router.delete(
    "/type/:typeName/:brandName",
    isAuthenticated,
    isAdmin,
    vehicleController.deleteTypeByName
);
router.delete(
    "/model/:modelName",
    isAuthenticated,
    isAdmin,
    vehicleController.deleteModelByName
);
router.delete(
    "/price/:modelName/:year",
    isAuthenticated,
    isAdmin,
    vehicleController.deletePriceByModelAndYear
);

// get enpoint
router.get(
    "/vehicle-brands",
    isAuthenticated,
    vehicleController.getVehicleBrands
);
router.get(
    "/vehicle-types",
    isAuthenticated,
    vehicleController.getVehicleTypesByBrand
);
router.get(
    "/vehicle-models",
    isAuthenticated,
    vehicleController.getVehicleModelsByType
);
router.get(
    "/vehicle-prices",
    isAuthenticated,
    vehicleController.getVehiclePricesByModelAndYear
);
router.get(
    "/vehicle-years",
    isAuthenticated,
    vehicleController.getVehicleYears
);

module.exports = router;
