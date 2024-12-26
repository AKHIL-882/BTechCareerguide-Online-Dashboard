import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const signup = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/signup`,
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const logoutUser = async (accessToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`, null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Logout API Error:", error);
    throw error;
  }
};

// export const fetchJobs = async (page = 1) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/jobs`, {
//       params: { page },
//     });
//     return response.data; // Assumes API returns data in { data: [], totalPages: X }
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     throw error;
//   }
// };