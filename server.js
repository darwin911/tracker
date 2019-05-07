const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.json({ msg: "Server is running" });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
