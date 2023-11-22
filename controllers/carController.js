const asyncHandler = require("express-async-handler");
const carModel = require("../model/carModel");

const addCarDetails = asyncHandler(async (req, res) => {
  try {
    const { model, car_body, brand } = req.body;
    const checkExistingModel = await carModel.find({ model });
    if (checkExistingModel.length > 0) {
      console.log("checkExistingModel", checkExistingModel);
      res.status(500);
      throw new Error(`existing model `);
    }
    const result = await carModel.create({ model, car_body, brand });
    if (!result) {
      res.status(404);
      throw new Error("car details not added");
    }
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const allCars = asyncHandler(async (req, res) => {
  try {
    const result = await carModel
      .find()
      .select({
        _id: 0,
      })
      .distinct("brand");
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const modelBasedonBrand = asyncHandler(async (req, res) => {
  try {
    const { brand } = req.params;

    const result = await carModel.find({ brand }).select({
      _id: 0,
      brand: 0,
      car_body: 0,
      __v: 0,
      image: 0,
    });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const carBodyBasedOnModel = asyncHandler(async (req, res) => {
  const { model } = req.params;
  try {
    const result = await carModel.find({ model }).select({
      _id: 0,
      brand: 0,
      model: 0,
      __v: 0,
    });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  addCarDetails,
  allCars,
  modelBasedonBrand,
  carBodyBasedOnModel,
};
