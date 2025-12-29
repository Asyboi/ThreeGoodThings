import { useState } from "react";
import { getLog } from "../services/requests";
import './PastLogs.css'; // import CSS

const LogFind = () => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [pastLog, setPastLog] = useState(null);

  const handleFind = async () => {
    setPastLog(null);
    const targetDateString = month + "-" + day + "-" + year;
    setTargetDate(targetDateString);
    const result = await getLog(targetDateString);
    if (result.error) {
      alert(`Ran into the following problem: ${result.error}`);
    } else if (result && result.message === "Log found successfully") {
      setPastLog(result.log.body);
    }
  };

  return (
    <div className="logfind-container">
      <h1 className="logfind-title">Find a Past Log</h1>

      <div className="logfind-inputs">
        <input
          type="text"
          placeholder="Month (mm)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="logfind-input"
        />
        <input
          type="text"
          placeholder="Day (dd)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="logfind-input"
        />
        <input
          type="text"
          placeholder="Year (yyyy)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="logfind-input"
        />
      </div>

      <button className="logfind-button" onClick={handleFind}>
        Find
      </button>

      {pastLog && (
        <div className="logfind-result">
          <p className="logfind-date">Log for {targetDate}</p>
          <div className="logfind-entries">
            <div>Thing 1: {pastLog.thing_1}</div>
            <div>Thing 2: {pastLog.thing_2}</div>
            <div>Thing 3: {pastLog.thing_3}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogFind;
