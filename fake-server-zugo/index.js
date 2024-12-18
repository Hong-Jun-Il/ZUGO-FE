const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {
  getSchool,
  getDormitory,
  getSchoolSearch,
  getDormSearch,
} = require("./controller");

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/univ/list", getSchool);
app.get("/dorm/list", getDormitory);
app.get("/univ/url", getSchoolSearch);
app.get("/dorm/url", getDormSearch);

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
