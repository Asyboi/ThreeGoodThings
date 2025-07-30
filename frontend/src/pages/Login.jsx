import { useState } from "react";
import { loginUser } from "../services/requests";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const result = await loginUser(username, password);
    console.log("Submitted username", username);
    console.log("Submitted password", password);
    setUsername("");
    setPassword("");
    if (result.error) {
      alert(`${result.error}`);
    } else if (result && result.message == "Login successful") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Three Good Things
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username: "
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password: "
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            onClick={handleSubmit}
          >
            Login
          </button>

          <p className="w-full text-black py-2 px-4">
            {" "}
            Don&apos;t have an account?{" "}
            <Link to="/create"> Create account </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
