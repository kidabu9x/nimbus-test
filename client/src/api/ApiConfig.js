const isProd = process.env.NODE_ENV === 'production';
const BASE_URL = isProd ? 'https://nimbus.edu.vn/api' : 'http://localhost:5000/api';

module.exports = {
  BASE_URL: BASE_URL
};