import axios from 'axios';
export default {
  userLogin(data) {
    return axios.post('/api/userlogin', data);
  },
  loadUserList(params) {
    params = {...params, ...{_sort: 'id', _order: 'desc'}}
    return axios.get('/per/user', {params: params});
  },
  addUser(data) {
    return axios.post('/per/user', data);
  }
}