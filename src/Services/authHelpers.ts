import axios from "axios";

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/refresh/", {
      refresh,
    });

    const newAccess = response.data.access;
    const newRefresh = response.data.refresh;   // important when rotation ON

    // store new tokens
    localStorage.setItem("access", newAccess);

    if (newRefresh) {
      localStorage.setItem("refresh", newRefresh);
    }

    return newAccess;
  } catch (err) {
    // refresh invalid or expired → force logout
    localStorage.clear();
    window.location.href = "/";
    return null;
  }
};
