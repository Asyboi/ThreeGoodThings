import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./styles/App.css";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import LogEntry from "./pages/LogEntry";
import LogFind from "./pages/PastLogs";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  // auth state check
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("userId"))
  );
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* ProtectedRoute redirects the user to /login page if not already logged in */}
        <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          } 
        />

        <Route path="/about" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <About />
            </ProtectedRoute>
          } 
        />
          
        <Route path="*" element={<NotFound />} />
        <Route path="/create" element={<CreateAccount setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/log" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <LogEntry />
            </ProtectedRoute>
          } 
        />

        <Route path="/pastentries" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <LogFind />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
