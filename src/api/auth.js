import axios from "axios";

// thay đổi địa chỉ IP này thành địa chỉ IP của máy chạy server
const BASE_URL = "https://api.vawndev.site";

export const loginApi = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/auth/token`, {
    email,
    password,
  });

  return res.data;
};

export const register = async (username, password, fullName, phoneNumber) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, {
      username,
      password,
      fullName,
      phoneNumber,
    });

    return { success: true, data: res.data };
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};
