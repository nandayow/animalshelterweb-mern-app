const express = require("express");
const router = express.Router();

const {
  getAnimals,
  getSingleAnimal,
  deleteAnimal,
  newAnimal,
  getPersonnelAnimals,
  updateAnimal,
  updateHealthStatus,
  createAnimalReview,
  getAnimalReviews,
  deleteReview,
  adoptAnimal,
  updateAdoptionStatus,
  deleteAdoptionRequest,
  getAdoptionAnimals,
  getRescuedChart,
  getAdoptedChart,
} = require("../controllers/animalController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/animals").get(getAnimals);
router.route("/animal/:id").get(getSingleAnimal);
router.route("/review").put(isAuthenticatedUser, createAnimalReview);
router.route("/reviews").get(isAuthenticatedUser, getAnimalReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

router.route("/chart/rescued").get(isAuthenticatedUser, getRescuedChart);
router.route("/chart/adopted").get(isAuthenticatedUser, getAdoptedChart);

router
  .route("/adopt")
  .put(isAuthenticatedUser, authorizeRoles("Adopter"), adoptAnimal);
router.route("/adopt/:id").put(isAuthenticatedUser, updateAdoptionStatus);
router
  .route("/adopt/trash/:id")
  .put(isAuthenticatedUser, deleteAdoptionRequest);

router
  .route("/adopt/trash/:id")
  .put(isAuthenticatedUser, deleteAdoptionRequest);

router
  .route("/personnel/animal/:id")
  .get(getSingleAnimal)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    deleteAnimal
  )
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    updateAnimal
  );
router
  .route("/personnel/animal/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    newAnimal
  );
router
  .route("/personnel/animals")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    getPersonnelAnimals
  );
router
  .route("/personnel/animal/status/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    updateHealthStatus
  );

router
  .route("/personnel/adoptions")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    getAdoptionAnimals
  );
module.exports = router;
