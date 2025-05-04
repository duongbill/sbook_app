import axios from 'axios';

// thay đổi địa chỉ IP này thành địa chỉ IP của máy chạy server
const BASE_URL = 'https://api.vawndev.site';


export const loginApi = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/auth/token`, {
    email,
    password
  });

  return res.data;
};

