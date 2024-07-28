import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend API URL
});

export const fetchUserProfile = async () => {
  const response = await api.get('/api/user/profile');
  return response.data;
};
