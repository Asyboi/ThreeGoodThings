import { Link } from "react-router-dom"; /* used for linking pages */
import { useState, useRef, useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";

const Navigation = () => {
  const [open, setOpen] = useState(false); /* declaring state variable (triggers component re-render) */
  const dropdownRef = useRef(null); /* declaring ref variable (does NOT trigger component re-render) */

  /* useEffect takes two parameters setup and an optional dependency 
    setup: function with useEffect logic. May include cleanup function 

    this useEffect mounts only once because it has zero dependencies
  */
  useEffect(() => {
    const handleClickOutside = (event) => { // 
      /* if the dropdown exists and the mouse click was outside of the dropdown, then close the dropdown 
        event.target -> element that was clicked
      */
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {  
        setOpen(false);
      }
    }; 

    // adds a listener to the event of a mouse click to the DOM and triggers handleClickOutside when event is heard
    document.addEventListener("mousedown", handleClickOutside); 
    return () => document.removeEventListener("mousedown", handleClickOutside); // cleanup function
  }, []);

  // handles dropdown for settings icon
  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <nav>
      <ul className="flex pt-5 px-3 space-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <div className="relative inline-block ml-auto" ref={dropdownRef}>
          <button // handles dropdown when clicking settings button
            onClick={toggleDropdown}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <AiFillSetting className="text-4xl" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
              <ul className="text-sm text-gray-700">
                <li>Light Mode</li>
                <li>Help</li>
              </ul>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
