const express = require("express");
const router = express.Router();

const {
  newHealth,
  getHealths,
  getSingleHealth,
  updateHealth,
  deleteHealth,
} = require("../controllers/healthController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// Healths
router
  .route("/personnel/health/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    newHealth
  );
router
  .route("/personnel/healths")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    getHealths
  );
router
  .route("/personnel/health/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    getSingleHealth
  );

router
  .route("/personnel/health/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    updateHealth
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    deleteHealth
  );

module.exports = router;
