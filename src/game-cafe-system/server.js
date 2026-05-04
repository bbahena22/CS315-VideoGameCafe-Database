import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "VideoGame-Data-test";

// 🔌 CONNECT TO MYSQL
const db = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log("Connection failed:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// 📊 REPORT 1 API
app.get("/report1", (req, res) => {
  const sql = `
    SELECT 
      e.EmployeeID,
      e.FirstName,
      e.LastName,
      e.Position,
      COUNT(cs.SessionID) AS TotalSessions,
      SUM(cs.HoursPlayed) AS TotalHours
    FROM Employees e
    LEFT JOIN CafeSessions cs
      ON e.EmployeeID = cs.EmployeeID
    GROUP BY e.EmployeeID, e.FirstName, e.LastName, e.Position;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// 📊 REPORT 2 API
app.get("/report2", (req, res) => {
  const sql = `
    SELECT 
      c.CustomerID,
      c.FullName,
      c.GamerTag,
      c.MembershipLevel,
      COUNT(cs.SessionID) AS TotalSessions,
      COALESCE(SUM(cs.HoursPlayed), 0) AS TotalHours
    FROM CustomerInfo c
    LEFT JOIN CafeSessions cs
      ON c.CustomerID = cs.CustomerID
    GROUP BY c.CustomerID, c.FullName, c.GamerTag, c.MembershipLevel
    ORDER BY c.CustomerID;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// 📊 REPORT 8 API
app.get("/report8", (req, res) => {
  const sql = `
    SELECT 
      e.EmployeeID,
      e.FirstName,
      e.LastName,
      HOUR(cs.StartTime) AS SessionHour,
      COUNT(cs.SessionID) AS TotalSessions,
      SUM(cs.HoursPlayed) AS TotalHours
    FROM Employees e
    JOIN CafeSessions cs
      ON e.EmployeeID = cs.EmployeeID
    GROUP BY e.EmployeeID, e.FirstName, e.LastName, HOUR(cs.StartTime)
    ORDER BY SessionHour, TotalSessions DESC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

const PORT = Number(process.env.PORT || 5001);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
  if (!DB_PASSWORD) {
    console.log("DB_PASSWORD is not set. Set it before running if MySQL requires a password.");
  }
});