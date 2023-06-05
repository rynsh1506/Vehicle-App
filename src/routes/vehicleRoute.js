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

router.get("/vehicle-brands", vehicleController.getVehicleBrands);
router.get("/vehicle-types", vehicleController.getVehicleTypesByBrand);
router.get("/vehicle-models", vehicleController.getVehicleModelsByType);
router.get("/vehicle-prices", vehicleController.getVehiclePricesByModelAndYear);
router.get("/vehicle-years", vehicleController.getVehicleYears);

module.exports = router;
