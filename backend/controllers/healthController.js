const Health = require("../models/health");

const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//create new health
exports.newHealth = async (req, res, next) => {
  // console.log(req.body);
  const health = await Health.create(req.body);

  res.status(201).json({
    success: true,
    health,
  });
 
};
// Getting Hetlths
exports.getHealths = async (req, res, next) => {
   const healthsCount = await Health.countDocuments();
  const apiFeatures = new APIFeatures(Health.find(), req.query)
    .search()
    .filter();
 
  const health = await apiFeatures.query;
  let filteredHealthsCount = health.length;

  res.status(200).json({
    success: true,
    healthsCount,
    filteredHealthsCount,
    health,
  });
};

//  GetSingleHealth
exports.getSingleHealth = async (req, res, next) => {
  const health = await Health.findById(req.params.id);

  if (!health) {
    return next(new ErrorHandler("Health not found", 404));
  }
  res.status(200).json({
    success: true,
    health,
  });
};

// UpdateHealth
exports.updateHealth = catchAsyncErrors(async (req, res, next) => {
  let health = await Health.findById(req.params.id);

  if (!health) {
    return next(new ErrorHandler("Health not found", 404));
  }

  health = await Health.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    health,
  });
});

// Delete Health   =>   /api/v1/personnel/health/:id
exports.deleteHealth = async (req, res, next) => {
  const health = await Health.findById(req.params.id);

  if (!health) {
    return next(new ErrorHandler("Health not found", 404));
  }

  await health.remove();

  res.status(200).json({
    success: true,
    message: "Health is deleted.",
  });
};
