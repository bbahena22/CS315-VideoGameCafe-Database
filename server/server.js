import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "#Cps45378128",
  database: "VideoGame-Data-test"
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL!");
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  db.query("SELECT * FROM Employees", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB Error");
    }
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  db.query("SELECT * FROM Employees", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("DB Error");
    }
    res.json(result);
  });
});