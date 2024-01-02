const express = require("express");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const {
  triggerEmail,
  saveTemplate,
  getTemplate,
  createUserList,
  getLists,
  addUsersIntoList,
} = require("./sailthru/functions");
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Db call
dbConnect();
// triggerEmail();
// saveTemplate();
// getTemplate();
// createUserList();
addUsersIntoList();
// getLists();

// service calls
app.use("/user", require("./routes/userRoute"));
app.use("/react-table", require("./routes/reactTableData"));
app.use("/car", require("./routes/carRoute"));
app.use("/sailthru", require("./routes/sailthruRoute"));

// custom middleware (error handler)
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server started on port ${PORT}`);
});
