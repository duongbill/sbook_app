import axios from 'axios';

// thay đổi địa chỉ IP này thành địa chỉ IP của máy chạy server
const BASE_URL = 'http://192.168.0.103:8080';

export const login = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/auth/token`, {
    email,
    password
  });

  return res.data;
};

