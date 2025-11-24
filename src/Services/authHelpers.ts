import axios from "axios";

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) return null;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/refresh/", {
      refresh: refresh,
    });

    const newAccess = response.data.access;
    console.log(newAccess)

    // Save updated access token
    localStorage.setItem("access", newAccess);

    return newAccess;
  } catch (error) {
    console.error("Refresh token expired. Please login again.");
    localStorage.clear();
    window.location.href = "/";
    return null;
  }
};
