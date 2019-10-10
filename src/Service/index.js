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
  },
  deleteUser(ids) {
    return Promise.all(ids.map(id => {
      return axios.delete(`/per/user/${id}`);
    }));
  },
  updateUser(user) {
    return axios.put(`/per/user/${user.id}`, user);
  },
  loadRoleList(params) {
    return axios.get('/per/role', {params});
  },
  deleteRoles(ids) {
    return Promise.all(ids.map(id => axios.delete(`/per/role/${id}`)));
  },
  addRole(role) {
    return axios.post('/per/role', role);
  },
  saveRole(role) {
    return axios.put(`/per/role/${role.id}`, role);
  },
  // 权限相关方法
  loadPerList(params) {
    return axios.get('/per/permission', {params});
  },
  // 添加权限的方法
  addPer(per) {
    return axios.post('/per/permission', per);
  }
}