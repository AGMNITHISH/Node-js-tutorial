const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
  model: {
    type: String,
    required: [true, "model is required"],
  },
  car_body: {
    type: String,
    required: [true, "car body is required"],
  },
  brand: {
    type: String,
    required: [true, "brand is required"],
  },
});

module.exports = mongoose.model("car", carSchema);
