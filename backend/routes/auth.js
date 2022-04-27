const express = require("express");
const router = express.Router();

const {
  registerUser,
  allUsers,
  loginUser,
  logout,
  deleteUser,
  getUserDetails,
  updateUser,
  getUserProfile,
  updateProfile,
  updateUserStatus,
  myAdoptions,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/adoptions/me").get(isAuthenticatedUser, myAdoptions);

router
  .route("/personnel/users")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian", "Volunteer"),
    allUsers
  );

router
  .route("/personnel/user/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "Employee", "Veterinarian"),
    getUserDetails
  )
  .put(isAuthenticatedUser, authorizeRoles("admin", "Employee"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin", "Employee"), deleteUser);

router.route("/personnel/user/status/:id").put(updateUserStatus);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/logout").get(logout);

module.exports = router;
