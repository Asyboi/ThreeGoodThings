import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import PropTypes from "prop-types";
import { logoutUser } from "../services/requests";
import './Navigation.css';

const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  const navigate = useNavigate();

  // auth state check function
  const authed = typeof isLoggedIn === "boolean"
    ? isLoggedIn
    : Boolean(localStorage.getItem("userId"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      firstMenuItemRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn?.(false);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="nav-inner">
        <div className="nav-left">
          <div className="nav-links">
            {authed && (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                Home
              </NavLink>
            )}
            {authed && (
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
              >
                About
              </NavLink>
            )}
          </div>
        </div>

        <div className="nav-right">
          {authed && (
            <button
              type="button"
              className="nav-link nav-link--logout"
              onClick={handleLogout}
            >
              Log Out
            </button>
          )}
          <div className="settings-wrapper" ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleDropdown}
              className="settings-button"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="Open settings"
            >
              <AiFillSetting className="settings-icon" />
            </button>
            {open && (
              <div className="dropdown-menu" role="menu">
                <button
                  type="button"
                  className="dropdown-item"
                  disabled
                  ref={firstMenuItemRef}
                  role="menuitem"
                >
                  Light Mode (WIP)
                </button>
                <button
                  type="button"
                  className="dropdown-item"
                  disabled
                  role="menuitem"
                >
                  Help (WIP)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
};

export default Navigation;
