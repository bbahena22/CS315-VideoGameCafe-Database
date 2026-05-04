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
    GROUP BY e.EmployeeID;
  `;

  db.query(sql, (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});