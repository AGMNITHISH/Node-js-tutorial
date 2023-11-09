const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongodb server started on ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
