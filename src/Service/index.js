import axios from 'axios';
export default {
  userLogin(data) {
    return axios.post('/api/userlogin', data);
  },
  loadUserList(params) {
    return axios.get('/per/user', {params: params});
  }
}