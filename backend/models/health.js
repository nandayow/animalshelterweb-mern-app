const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter health name"],
    trim: true,
    unique: true,
    maxLength: [100, "Health name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter health description"],
    default: "N/A",
  },
  category: {
    type: String,
    required: [true, "Please select category for this health problem"],
    enum: {
      values: ["Disease", "Injury"],
      message: "Please select correct category for product",
    },
  },
});

module.exports = mongoose.model("Health", healthSchema);
