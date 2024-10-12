import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const saveProgress = async (token: string, stats: any) => {
  const response = await axios.post(
    `${API_URL}/user/save-progress`,
    { stats },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};