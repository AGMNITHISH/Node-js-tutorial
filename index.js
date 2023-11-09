const express = require("express");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");
const dbConnect = require("./config/dbConnect");
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Db call
dbConnect();

// service calls
app.use("/user", require("./routes/userRoute"));

// custom middleware (error handler)
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server started on port ${PORT}`);
});
