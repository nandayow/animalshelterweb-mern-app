const Animal = require("../models/animal");

const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;

exports.getAnimals = async (req, res, next) => {
  const resPerPage = 4;
  const animalsCount = await Animal.countDocuments();

  const apiFeatures = new APIFeatures(
    Animal.find({
      $and: [{ "adoption.status": "N/A" }, { healthstatus: "Cured" }],
    }),
    req.query
  )
    .search()
    .filter();

  apiFeatures.pagination(resPerPage);
  const animals = await apiFeatures.query;
  let filteredAnimalsCount = animals.length;

  if (!animals) {
    return next(new ErrorHandler("Animal not found", 404));
  }
  res.status(200).json({
    success: true,
    animalsCount,
    filteredAnimalsCount,
    resPerPage,
    animals,
  });
};

exports.getSingleAnimal = async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(new ErrorHandler("Animal not found", 404));
  }
  res.status(200).json({
    success: true,
    animal,
  });
};

exports.deleteAnimal = async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);
  if (!animal) {
    return res.status(404).json({
      success: false,
      message: "Animal not found",
    });
  }
  await animal.remove();
  res.status(200).json({
    success: true,
    message: "Animal deleted",
  });
};

exports.newAnimal = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "animals",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  let healths = [];

  if (typeof req.body.healths === "string") {
    healths.push(req.body.healths);
  } else {
    healths = req.body.healths;
  }

  let healthList = [];

  for (let i = 0; i < healths.length; i++) {
    healthList.push({ health_name: healths[i] });
  }

  req.body.images = imagesLinks;
  req.body.healths = healthList;
  // req.body.user = req.body.category;
  console.log(imagesLinks);

  console.log(healthList);

  const animal = await Animal.create(req.body);
  console.log(req.body.category);

  res.status(201).json({
    success: true,
    animal,
  });
});

// Get all products (Personnel)  =>   /api/v1/personnel/products
exports.getPersonnelAnimals = catchAsyncErrors(async (req, res, next) => {
  const animals = await Animal.find();

  res.status(200).json({
    success: true,
    animals,
  });
});

exports.getAdoptionAnimals = catchAsyncErrors(async (req, res, next) => {
  const animals = await Animal.find({
    $or: [{ "adoption.status": "Approved" }, { "adoption.status": "Pending" }],
  });

  res.status(200).json({
    success: true,
    animals,
  });
});
exports.updateAnimal = catchAsyncErrors(async (req, res, next) => {
  let animal = await Animal.findById(req.params.id);

  if (!animal) {
    return next(new ErrorHandler("Animal not found", 404));
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the animals
    for (let i = 0; i < animal.images.length; i++) {
      const result = await cloudinary.uploader.destroy(
        animal.images[i].public_id
      );
    }
    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "animals",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
    console.log(imagesLinks);
  }

  let healths = [];

  if (typeof req.body.healths === "string") {
    healths.push(req.body.healths);
  } else {
    healths = req.body.healths;
  }

  let healthList = [];

  for (let i = 0; i < healths.length; i++) {
    healthList.push({ health_name: healths[i] });
  }

  req.body.healths = healthList;

  console.log(req.body);
  animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    animal,
  });
});

exports.updateHealthStatus = catchAsyncErrors(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  console.log(animal);

  if (animal.healthstatus === "Cured") {
    const statusdata = {
      healthstatus: "Not Cured",
    };
    const animal = await Animal.findByIdAndUpdate(req.params.id, statusdata, {
      new: true,
      runValidators: true,
    });
  } else {
    const statusdata = {
      healthstatus: "Cured",
    };
    const animal = await Animal.findByIdAndUpdate(req.params.id, statusdata, {
      new: true,
      runValidators: true,
    });
  }

  res.status(200).json({
    success: true,
  });
});

exports.createAnimalReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, animalId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const animal = await Animal.findById(animalId);

  const isReviewed = animal.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    animal.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    animal.reviews.push(review);
    animal.numOfReviews = animal.reviews.length;
  }

  animal.ratings =
    animal.reviews.reduce((acc, item) => item.rating + acc, 0) /
    animal.reviews.length;

  await animal.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get Animal Reviews   =>   /api/v1/reviews
exports.getAnimalReviews = catchAsyncErrors(async (req, res, next) => {
  const animal = await Animal.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: animal.reviews,
  });
});

// Delete Animal Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const animal = await Animal.findById(req.query.animalId);

  console.log(req);

  const reviews = animal.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    animal.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await Animal.findByIdAndUpdate(
    req.query.animalId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.adoptAnimal = catchAsyncErrors(async (req, res, next) => {
  const { status, animalId } = req.body;

  const req_adoption = {
    user: req.user._id,
    name: req.user.name,
    status: "Pending",
  };

  const animal = await Animal.findById(animalId);
  if (animal.adoption.status !== "N/A") {
  } else {
    animal.adoption = req_adoption;
  }

  await animal.save({ validateBeforeSave: false });

  console.log(animal);
  res.status(200).json({
    success: true,
  });
});

exports.updateAdoptionStatus = catchAsyncErrors(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  if (animal.adoption.status === "Pending") {
    const req_adoption = {
      user: req.user._id,
      name: req.user.name,
      adoptedAt: Date(animal.adoption.adoptedAt),
      status: "Approved",
    };
    animal.adoption = req_adoption;
  } else {
    const req_adoption = {
      user: req.user._id,
      name: req.user.name,
      adoptedAt: Date(animal.adoption.adoptedAt),
      status: "Pending",
    };
    animal.adoption = req_adoption;
  }

  await animal.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.deleteAdoptionRequest = catchAsyncErrors(async (req, res, next) => {
  const animal = await Animal.findById(req.params.id);

  if (animal.adoption.status !== "N/A") {
    const req_adoption = {
      status: "N/A",
    };
    animal.adoption = req_adoption;
  }

  await animal.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.getRescuedChart = async (req, res, next) => {
  const animals = await Animal.find({})
    .select(["createdAt"])
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    animals,
  });
};

// exports.getAdoptedChart = async (req, res, next) => {
//   const adopted = await Animal.find({ "adoption.status": "Approved" }).select([
//     "adoption.adoptedAt",
//   ]);

//   const adoption = adopted._id;
//   console.log(adoption);
//   res.status(200).json({
//     success: true,
//     adopted,
//   });
// };
exports.getAdoptedChart = async (req, res, next) => {
  const adopted = await Animal.find({ "adoption.status": "Approved" });

  // console.log(adoptions.adoption);
  res.status(200).json({
    success: true,
    adopted,
  });
};
