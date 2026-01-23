import { useState } from "react";
import { getLog } from "../services/requests";
import './styles/PastLogs.css'; // import CSS

const LogFind = () => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [pastLog, setPastLog] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFind = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setPastLog(null);

    const targetDateString = `${month}-${day}-${year}`;
    setTargetDate(targetDateString);
    setLoading(true);
    const result = await getLog(targetDateString);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result && result.message === "Log found successfully") {
      setPastLog(result.log.body);
    } else {
      setError("No log found for that date");
    }
  };

  return (
    <div className="tg-page tg-surface">
      <div className="tg-container">
        <div className="tg-card logfind-card">
          <div className="logfind-header">
            <h1 className="tg-title">Find a Past Log</h1>
            <p className="tg-help">Logs are currently based on Central Standard Time (CST).</p>
          </div>

          <form className="tg-stack" onSubmit={handleFind}>
            <div className="logfind-inputs">
              <div>
                <label className="tg-label" htmlFor="logfind-month">
                  Month
                </label>
                <input
                  id="logfind-month"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="tg-field"
                />
              </div>
              <div>
                <label className="tg-label" htmlFor="logfind-day">
                  Day
                </label>
                <input
                  id="logfind-day"
                  type="text"
                  inputMode="numeric"
                  placeholder="DD"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="tg-field"
                />
              </div>
              <div>
                <label className="tg-label" htmlFor="logfind-year">
                  Year
                </label>
                <input
                  id="logfind-year"
                  type="text"
                  inputMode="numeric"
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="tg-field"
                />
              </div>
            </div>

            {error ? (
              <div className="tg-alert" role="alert">
                {error}
              </div>
            ) : null}

            <div className="logfind-actions">
              <button
                className="tg-btn tg-btn--primary"
                type="submit"
                disabled={loading || !month.trim() || !day.trim() || !year.trim()}
              >
                {loading ? "Finding…" : "Find"}
              </button>
            </div>
          </form>

          {pastLog ? (
            <div className="logfind-result">
              <div className="logfind-date">Log for {targetDate}</div>
              <div className="logfind-entries">
                <div className="logfind-entry">
                  <span className="logfind-entry-label">Log 1</span>
                  <span className="logfind-entry-value">{pastLog.thing_1}</span>
                </div>
                <div className="logfind-entry">
                  <span className="logfind-entry-label">Log 2</span>
                  <span className="logfind-entry-value">{pastLog.thing_2}</span>
                </div>
                <div className="logfind-entry">
                  <span className="logfind-entry-label">Log 3</span>
                  <span className="logfind-entry-value">{pastLog.thing_3}</span>
                </div>
              </div>
            </div>
          ) : targetDate ? (
            <div className="logfind-empty">No results loaded yet.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LogFind;
