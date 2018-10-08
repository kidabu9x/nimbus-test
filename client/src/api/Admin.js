import axios from 'axios';
import ApiConfig from '@/Api/ApiConfig';

export default () => {
  return axios.create({
    baseURL: `${ApiConfig.BASE_URL}/admin/`
  })
}