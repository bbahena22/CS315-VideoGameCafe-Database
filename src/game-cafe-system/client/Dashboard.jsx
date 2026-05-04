import { useEffect, useState } from "react";

export default function Dashboard() {
  const [report1, setReport1] = useState([]);
  const [report2, setReport2] = useState([]);
  const [report8, setReport8] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5001";

    Promise.all([
      fetch(`${apiBase}/report1`)
        .then(res => res.json())
        .then(data => setReport1(data))
        .catch(err => {
          setError("Failed to load report1: " + err.message);
        }),
      fetch(`${apiBase}/report2`)
        .then(res => res.json())
        .then(data => setReport2(data))
        .catch(err => {
          setError("Failed to load report2: " + err.message);
        }),
      fetch(`${apiBase}/report8`)
        .then(res => res.json())
        .then(data => setReport8(data))
        .catch(err => {
          setError("Failed to load report8: " + err.message);
        })
    ]).finally(() => setLoading(false));
  }, []);

  const toNumber = (value) => Number(value || 0);

  const totalEmployeeSessions = report1.reduce(
    (sum, row) => sum + toNumber(row.TotalSessions),
    0,
  );
  const totalEmployeeHours = report1.reduce(
    (sum, row) => sum + toNumber(row.TotalHours),
    0,
  );
  const totalCustomerSessions = report2.reduce(
    (sum, row) => sum + toNumber(row.TotalSessions),
    0,
  );
  const totalCustomerHours = report2.reduce(
    (sum, row) => sum + toNumber(row.TotalHours),
    0,
  );
  const totalSessionHistorySessions = report8.reduce(
    (sum, row) => sum + toNumber(row.TotalSessions),
    0,
  );
  const totalSessionHistoryHours = report8.reduce(
    (sum, row) => sum + toNumber(row.TotalHours),
    0,
  );

  if (error) {
    return (
      <div className="dashboard-page">
        <header className="dashboard-nav">
          <div className="dashboard-brand">Pixel Brew Café</div>
          <div className="dashboard-status">Database Viewer</div>
        </header>
        <div className="dashboard-message dashboard-message-error">
          <p>Backend Error: {error}</p>
          <p>Make sure the API server is running on port 5001 with: DB_PASSWORD='your_password' npm run api</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <header className="dashboard-nav">
          <div className="dashboard-brand">Pixel Brew Café</div>
          <div className="dashboard-status">Loading Reports...</div>
        </header>
        <div className="dashboard-message">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-nav">
        <div>
          <p className="dashboard-label">Admin Panel</p>
          <h1 className="dashboard-brand">Pixel Brew Café</h1>
        </div>
        <nav className="dashboard-links" aria-label="Reports navigation">
          <a href="#report1">Employees</a>
          <a href="#report2">Customers</a>
          <a href="#report8">Sessions</a>
        </nav>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <h2>Game Café Database Overview</h2>
          <p>Live report view for employee performance, customer activity, and session history.</p>
        </section>

        <section className="dashboard-stats" aria-label="Key metrics">
          <article className="stat-card">
            <p className="stat-label">Employees</p>
            <p className="stat-value">{report1.length}</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Total Sessions</p>
            <p className="stat-value">{totalEmployeeSessions}</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Total Hours</p>
            <p className="stat-value">{totalEmployeeHours}</p>
          </article>
          <article className="stat-card">
            <p className="stat-label">Customers</p>
            <p className="stat-value">{report2.length}</p>
          </article>
        </section>

        <section id="report1" className="report-card">
          <h3>Report 1 · Employee Performance</h3>
          <p className="report-description">Description: Shows number of sessions and total hours worked per employee.</p>
          <div className="table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Sessions</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {report1.length > 0 ? (
                  report1.map((row, index) => (
                    <tr key={index}>
                      <td>{row.FirstName} {row.LastName}</td>
                      <td>{row.Position}</td>
                      <td>{row.TotalSessions}</td>
                      <td>{row.TotalHours ?? 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-row">No data</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="total-row">
                  <td colSpan="2">Total</td>
                  <td>{totalEmployeeSessions}</td>
                  <td>{totalEmployeeHours}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section id="report2" className="report-card">
          <h3>Report 2 · Customer Activity</h3>
          <p className="report-description">Description: Shows customer sessions and membership level.</p>
          <div className="table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>GamerTag</th>
                  <th>Membership</th>
                  <th>Sessions</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {report2.length > 0 ? (
                  report2.map((row, index) => (
                    <tr key={index}>
                      <td>{row.FullName}</td>
                      <td>{row.GamerTag}</td>
                      <td>{row.MembershipLevel}</td>
                      <td>{row.TotalSessions}</td>
                      <td>{row.TotalHours}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-row">No data</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="total-row">
                  <td colSpan="3">Total</td>
                  <td>{totalCustomerSessions}</td>
                  <td>{totalCustomerHours}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section id="report8" className="report-card">
          <h3>Report 8 · Customer Session History</h3>
          <p className="report-description">Description: Shows employee activity based on time of day and number of sessions handled per hour.</p>
          <div className="table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Session Hour</th>
                  <th>Sessions</th>
                  <th>Hours Played</th>
                </tr>
              </thead>
              <tbody>
                {report8.length > 0 ? (
                  report8.map((row, index) => (
                    <tr key={index}>
                      <td>{row.EmployeeID}</td>
                      <td>{row.FirstName} {row.LastName}</td>
                      <td>{row.SessionHour}:00</td>
                      <td>{row.TotalSessions}</td>
                      <td>{row.TotalHours}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-row">No data</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="total-row">
                  <td colSpan="3">Total</td>
                  <td>{totalSessionHistorySessions}</td>
                  <td>{totalSessionHistoryHours}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}