import axios from 'axios';
export default {
  userLogin(data) {
    return axios.post('/api/userlogin', data);
  },
  loadUserList() {
    return axios.get('/per/user')
  }
}