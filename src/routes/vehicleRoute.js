const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehileController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Endpoint untuk create vehicle entity
router.post(
    "/",
    isAuthenticated,
    isAdmin,
    vehicleController.createVehicleEntity
);

router.patch(
    "/",
    isAuthenticated,
    isAdmin,
    vehicleController.updateVehicleEntity
);

// router.get("/vehicles", vehicleController.getFilteredVehicles);

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
