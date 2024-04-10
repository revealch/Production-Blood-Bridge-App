const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  donarListController,
  hospitalListController,
  organizationListController,
  deleteDonarHospitalOrg,
} = require("../controllers/adminControllers");

const router = express.Router();

router.get("/donar-list", authMiddleware, adminMiddleware, donarListController);
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  hospitalListController
);
router.get(
  "/organization-list",
  authMiddleware,
  adminMiddleware,
  organizationListController
);

//delete donar
router.delete("/delete-donar-hospital-org/:id", authMiddleware, adminMiddleware, deleteDonarHospitalOrg);

module.exports = router;
