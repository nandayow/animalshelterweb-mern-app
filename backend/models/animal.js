const mongoose = require("mongoose");
const { farsiLocales } = require("validator/lib/alpha");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter animal's name"],
    trim: true,
    maxLength: [100, "Animal name cannot exceed 100 characters"],
  },
  age: {
    type: Number,
    required: [true, "Please enter animal's approx. age"],
    maxLength: [5, "Age name cannot exceed 5 characters"],
    default: 0,
  },
  breed: {
    type: String,
    required: [true, "Please enter animal's breed"],
  },

  gender: {
    type: String,
    required: [true, "Please select the gender of this animal"],
    enum: {
      values: ["Male", "Female"],
      message: "Please select correct gender  for this animal",
    },
  },
  category: {
    type: String,
    required: [true, "Please select category for this animal"],
    enum: {
      values: ["Cat", "Dog"],
      message: "Please select correct category for product",
    },
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  healths: [
    {
      health_name: {
        type: String,
        ref: "Health",
        required: true,
      },
    },
  ],

  healthstatus: {
    type: String,
    required: [true, "Please select health status of this animal"],
    default: "Not Cured",
    enum: {
      values: ["Cured", "Not Cured"],
      message: "Please select correct status category for animal",
    },
  },

  rescuer: {
    type: String,
    required: [true, "Please enter the rescuer's name"],
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  adoption: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "N/A",
      required: true,
    },
    adoptedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Animal", animalSchema);
