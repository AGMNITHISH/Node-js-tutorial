const asyncHandler = require("express-async-handler");
const ReactTableData = require("../model/reactTableModel");

const addTableData = asyncHandler(async (req, res) => {
  const { brand, model, image, car_body, color, price, year, userId } =
    req.body;
  if (
    !brand ||
    !model ||
    !image ||
    !car_body ||
    !color ||
    !price ||
    !year ||
    !userId
  ) {
    res.status(404);
    throw new Error("please fill the required fields");
  }
  const findExistingModal = await ReactTableData.findOne({
    model: model,
    userId: userId,
  });

  if (!findExistingModal) {
    const createTableRow = await ReactTableData.create({
      brand,
      model,
      image,
      car_body,
      color,
      price,
      year,
      userId,
    });
    res.status(201).json({
      doc: createTableRow,
    });
  } else {
    res.status(500);
    throw new Error(`${brand} -  ${model} is already there `);
  }
});
const getTableData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ReactTableData.find({ userId: id }).select({
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
      userId: 0,
      __v: 0,
    });
    res.status(200).json({ doc: result });
  } catch (error) {
    res.status(500);
    throw new Error("something went wrong");
  }
});
const updateTableDataStatus = asyncHandler(async (req, res) => {
  try {
    const { model } = req.params;
    const { status, id } = req.body;
    const checkExisting = await ReactTableData.find({ model: model, _id: id });
    if (!checkExisting) {
      res.status(404);
      throw new Error(` ${model} not found`);
    }
    const updateExisitngModelData = await ReactTableData.findOneAndUpdate(
      { model: model, userId: id },
      { $set: { status: status } },
      { new: true }
    );
    if (!updateExisitngModelData) {
      res.status(404);
      throw new Error(`${model} not updated`);
    }
    res.status(200).json({
      doc: updateExisitngModelData,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateTableDataFav = asyncHandler(async (req, res) => {
  try {
    const { model } = req.params;
    const { favorites, userId } = req.body;
    if (!favorites) {
      res.status(404);
      throw new Error("favorites filed is required");
    }
    const checkExisting = await ReactTableData.find({
      model: model,
      userId: userId,
    });
    if (!checkExisting) {
      res.status(404);
      throw new Error(` ${model} not found`);
    }
    const updateExisitngModelData = await ReactTableData.findOneAndUpdate(
      { model: model, userId: userId },
      { $set: { favorites: favorites } },
      { new: true }
    );
    if (!updateExisitngModelData) {
      res.status(404);
      throw new Error(`${model} not updated`);
    }
    res.status(200).json({
      doc: updateExisitngModelData,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteTableData = asyncHandler(async (req, res) => {
  try {
    const { model } = req.params;
    const checkExisting = await ReactTableData.find({ model: model });
    if (!checkExisting) {
      res.status(404);
      throw new Error(` ${model} not found`);
    }
    const deleteModel = await ReactTableData.findOneAndDelete({ model: model });
    if (deleteModel) {
      res.status(200).json({
        doc: deleteModel,
      });
    } else {
      res.status(404);
      throw new Error("user not found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addTableData,
  updateTableDataFav,
  getTableData,
  updateTableDataStatus,
  deleteTableData,
};
