import { useState } from "react";
import { createLog } from "../services/requests";
import './LogEntry.css'; // import the CSS file

const LogEntry = () => {
  const [logEntry1, setLogEntry1] = useState("");
  const [logEntry2, setLogEntry2] = useState("");
  const [logEntry3, setLogEntry3] = useState("");

  const handleSave = async () => {
    const logs = [logEntry1, logEntry2, logEntry3];
    const result = await createLog(logs);
    console.log("Created Log:", result);

    if (result.error) {
      alert(`${result.error}`);
    } else {
      setLogEntry1("");
      setLogEntry2("");
      setLogEntry3("");
    }
  };

  return (
    <div className="log-container">
      <h1 className="log-title">Write three good things about today!</h1>

      <div className="log-grid">
        <div className="log-box">
          <textarea
            value={logEntry1}
            onChange={(e) => setLogEntry1(e.target.value)}
            placeholder="Log 1"
            className="log-textarea"
          />
        </div>
        <div className="log-box">
          <textarea
            value={logEntry2}
            onChange={(e) => setLogEntry2(e.target.value)}
            placeholder="Log 2"
            className="log-textarea"
          />
        </div>
        <div className="log-box">
          <textarea
            value={logEntry3}
            onChange={(e) => setLogEntry3(e.target.value)}
            placeholder="Log 3"
            className="log-textarea"
          />
        </div>
      </div>

      <button className="log-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default LogEntry;
