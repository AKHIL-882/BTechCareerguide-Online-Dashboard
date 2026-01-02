export const clearAuthStorage = () => {
  try {
    localStorage.removeItem("data");
    localStorage.removeItem("roles");
    localStorage.removeItem("isLoggedIn");
  } catch (error) {
    console.error("Unable to clear auth storage:", error);
  }
};

export const logoutAndRedirect = () => {
  clearAuthStorage();
  if (typeof window !== "undefined") {
    window.location.replace("/");
  }
};

export const getStoredAccessToken = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("data") || "{}");
    return stored?.access_token;
  } catch {
    return null;
  }
};
