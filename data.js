const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/sample_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const sampleData = require("./sample_data.json");

User.insertMany(sampleData, (err, docs) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Sample data inserted successfully");
  }
  mongoose.connection.close();
});
