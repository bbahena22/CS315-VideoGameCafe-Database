app.get("/report2", (req, res) => {
  const sql = `
    SELECT 
      c.CustomerID,
      c.FullName,
      c.GamerTag,
      c.MembershipLevel,
      COUNT(cs.SessionID) AS TotalSessions,
      SUM(cs.HoursPlayed) AS TotalHours
    FROM CustomerInfo c
    LEFT JOIN CafeSessions cs
      ON c.CustomerID = cs.CustomerID
    GROUP BY c.CustomerID;
  `;

  db.query(sql, (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});