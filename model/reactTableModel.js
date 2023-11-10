const mongoose = require("mongoose");

const reactTableSchema = mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    car_body: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "In stock",
    },
    favorites: {
      type: String,
      default: "No",
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("ReactTableData", reactTableSchema);
