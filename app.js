require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const { connectDb } = require("./db/db");
const router = require("./routes/router");
const port = 5000;

connectDb();

app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use("/files", express.static("./public/files"));
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`server start at port no ${port}`);
});
