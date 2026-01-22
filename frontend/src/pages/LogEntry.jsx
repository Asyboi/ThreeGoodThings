import { useEffect, useRef, useState } from "react";
import { createLog } from "../services/requests";
import './styles/LogEntry.css'; // import the CSS file

const LogEntry = () => {
  const [logEntry1, setLogEntry1] = useState("");
  const [logEntry2, setLogEntry2] = useState("");
  const [logEntry3, setLogEntry3] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const savedTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (savedTimeoutRef.current) window.clearTimeout(savedTimeoutRef.current);
    };
  }, []);

  const handleSave = async () => {
    if (saving) return;
    const trimmed = [logEntry1.trim(), logEntry2.trim(), logEntry3.trim()];
    if (trimmed.every((t) => !t)) return;

    setError("");
    setSaved(false);
    setSaving(true);
    const logs = [logEntry1, logEntry2, logEntry3];
    const result = await createLog(logs);
    setSaving(false);

    if (result.error) {
      setError(result.error);
    } else {
      setLogEntry1("");
      setLogEntry2("");
      setLogEntry3("");
      setSaved(true);
      if (savedTimeoutRef.current) window.clearTimeout(savedTimeoutRef.current);
      savedTimeoutRef.current = window.setTimeout(() => setSaved(false), 1600);
    }
  };

  return (
    <div className="tg-page tg-surface">
      <div className="tg-container">
        <div className="tg-card log-card">
          <div className="log-header">
            <h1 className="tg-title">Write three good things about today</h1>
            <p className="tg-subtitle">Small wins count. Keep it simple and specific.</p>
          </div>

          <div className="log-grid">
            <div className="log-item">
              <div className="log-label">Thing 1</div>
              <textarea
                value={logEntry1}
                onChange={(e) => setLogEntry1(e.target.value)}
                placeholder="Something that went well…"
                className="tg-field log-textarea"
                rows={6}
              />
            </div>
            <div className="log-item">
              <div className="log-label">Thing 2</div>
              <textarea
                value={logEntry2}
                onChange={(e) => setLogEntry2(e.target.value)}
                placeholder="A person, moment, or progress…"
                className="tg-field log-textarea"
                rows={6}
              />
            </div>
            <div className="log-item">
              <div className="log-label">Thing 3</div>
              <textarea
                value={logEntry3}
                onChange={(e) => setLogEntry3(e.target.value)}
                placeholder="Something you’re grateful for…"
                className="tg-field log-textarea"
                rows={6}
              />
            </div>
          </div>

          {error ? (
            <div className="tg-alert" role="alert">
              {error}
            </div>
          ) : null}

          {saved ? <div className="log-saved">Saved</div> : null}

          <div className="log-actions">
            <button
              className="tg-btn tg-btn--primary"
              onClick={handleSave}
              disabled={
                saving ||
                [logEntry1.trim(), logEntry2.trim(), logEntry3.trim()].every((t) => !t)
              }
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogEntry;
