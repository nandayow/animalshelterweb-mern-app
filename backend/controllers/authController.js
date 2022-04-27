const User = require("../models/user");
const Animal = require("../models/animal");

const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(
    req.body.avatar,
    {
      folder: "avatars",
      width: 150,
      crop: "scale",
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  sendToken(user, 200, res);
});

// Get all users   =>   /api/v1/personnel/users
exports.allUsers = async (req, res, next) => {
  const users = await User.find({ role: { $ne: "admin" } });

  res.status(200).json({
    success: true,
    users,
  });
};
// Get all users   =>   /api/v1/login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Check if active
  if (user.status !== "active") {
    return next(
      new ErrorHandler(
        "Inactive Account, Please enter new email & password",
        400
      )
    );
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
};

exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};
exports.myAdoptions = async (req, res, next) => {
  const adoptions = await Animal.find({ "adoption.user": req.user.id });

  // console.log(animals);
  res.status(200).json({
    success: true,
    adoptions,
  });
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

// Delete user   =>   /api/v1/personnel/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.uploader.destroy(image_id);

    const result = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    // useFindAndModify: false
  });

  res.status(200).json({
    success: true,
  });
};

// Get user details   =>   /api/v1/personnel/user/:id
exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
};
// Get update user details   =>   /api/v1/personnel/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

exports.updateUserStatus = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  console.log(user);

  if (user.status === "active") {
    const statusdata = {
      status: "inactive",
    };
    const user = await User.findByIdAndUpdate(req.params.id, statusdata, {
      new: true,
      runValidators: true,
    });
  } else {
    const statusdata = {
      status: "active",
    };
    const user = await User.findByIdAndUpdate(req.params.id, statusdata, {
      new: true,
      runValidators: true,
    });
  }

  res.status(200).json({
    success: true,
  });
});

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.uploader.destroy(image_id);

    const result = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    // useFindAndModify: false
  });

  res.status(200).json({
    success: true,
  });
};

exports.newPersonnel = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(
    req.body.avatar,
    {
      folder: "avatars",
      width: 150,
      crop: "scale",
    },
    (err, res) => {
      console.log(err, res);
    }
  );
  console.log(result);
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  sendToken(user, 200, res);
});
