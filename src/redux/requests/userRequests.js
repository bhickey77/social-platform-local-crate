import axios from 'axios';

export function callUser() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/user', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callUserInfo() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/user/info', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}