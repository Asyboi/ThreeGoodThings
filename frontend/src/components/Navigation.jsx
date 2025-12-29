import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";
import './Navigation.css';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li className="settings-wrapper" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="settings-button">
            <AiFillSetting className="settings-icon" />
          </button>
          {open && (
            <div className="dropdown-menu">
              <ul className="dropdown-list">
                <li className="dropdown-item">Light Mode</li>
                <li className="dropdown-item">Help</li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
