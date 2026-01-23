// Index for all api calls
// TODO: create env-based API base to allow local dev and frontend deployment
// const API_BASE = "https://threegoodthings.onrender.com"; // Updated so it runs on production backend server API
const API_BASE = "http://localhost:5001"; // Use this as API base when developing locally
// Create a new user account (POST method)
export async function createUser(username, email, password) {
  const response = await fetch(`${API_BASE}/api/users/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const responseData = await response.json();

  // set current userId if successful creation
  if (responseData && responseData["user_id"]) {
    localStorage.setItem("userId", responseData["user_id"]);
  }

  return responseData;
}

// Login a user (POST method)
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_BASE}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    });

    const responseData = await response.json();

    if (!response.ok || !responseData?.user_id) {
      return { error: responseData?.error || "Login failed" };
    }

    localStorage.setItem("userId", responseData.user_id);
    return responseData;
  } catch {
    return { error: "Login failed" };
  }
}

// Logout a user
export function logoutUser() {
  // clear the userId key from localStorage
  localStorage.removeItem("userId");
}

// Create a log (method POST)
export async function createLog(things) {
  // Add userId as stored from during either login or creation
  const userId = localStorage.getItem("userId");

  // Post to backend
  const response = await fetch(`${API_BASE}/api/logs/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, things }),
  });

  return await response.json();
}

// Fetch a past log for a given date (method GET)
export async function getLog(targetDate) {
  // Add userId as stored from during either login or creation
  const userId = localStorage.getItem("userId");

  // Fetch from backend
  const response = await fetch(
    `${API_BASE}/api/logs/get?userId=${userId}&date=${targetDate}`
  );
  return await response.json();
}
