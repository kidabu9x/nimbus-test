import axios from 'axios';
import ApiConfig from '@/api/ApiConfig';

export default () => {
  return axios.create({
    baseURL: `${ApiConfig.BASE_URL}/`
  })
}