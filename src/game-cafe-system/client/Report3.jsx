app.get("/report8", (req, res) => {
  const sql = `
    SELECT 
      HOUR(StartTime) AS Hour,
      COUNT(SessionID) AS TotalSessions,
      SUM(HoursPlayed) AS TotalHours
    FROM CafeSessions
    GROUP BY HOUR(StartTime)
    ORDER BY Hour;
  `;

  db.query(sql, (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});