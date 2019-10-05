import React, { Component } from 'react'
import { Breadcrumb, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { LoadUserActionAsync } from '../../../Action/UserAction';
import AddUser from './AddUser';
// import service from '../../../Service';
import store from '../../../store';

class UserMgr extends Component {
  state = {
    showAddUserDialog: false,
    unsubscribe: null,
    userlist: store.getState().UserList.list,
    total: 0,
    params: {_page: 1, _limit: 6},
    columns: [{
      key: 'id',
      title: '编号',
      dataIndex: 'id'
    }, {
      key: 'name',
      title: '姓名',
      dataIndex: 'name'
    }, {
      key: 'phone',
      title: '电话',
      dataIndex: 'phone'
    }]
  }

  userListChange = () => {
    const UserList = store.getState().UserList;
    this.setState({userlist: UserList.list, total: UserList.total});
  }
  componentDidMount() {
    // 发送ajax请求到后台，获取当前用户的列表数据
    // service.loadUserList()
    // .then(res => {
    //   this.setState({userlist: res.data});
    // })
    store.dispatch(LoadUserActionAsync(this.state.params));
    const unsubscribe = store.subscribe(this.userListChange);
    this.setState({unsubscribe: unsubscribe});
  }

  componentWillUnmount() {
    this.state.unsubscribe && (this.state.unsubscribe());
  }

  userRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows);
    }
  }

  changePage = (page, pageSize) => {
    // console.log('page:', page, ',pageSize:', pageSize);
    this.setState(preState=> {
      return {...preState, ...{params: {_page: page, _limit: pageSize}}}
    }, ()=> {
      store.dispatch(LoadUserActionAsync(this.state.params));
    });
  }

  hideAddUserDialog = () => {
    this.setState({showAddUserDialog: false});
  }
  buttonStyle = {margin: '5px'};

  render () {
    return (
      <div className="admin-usermgr">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/user_mgr">用户管理</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr/>
        <Button onClick={()=> this.setState({showAddUserDialog: true})} style={this.buttonStyle} type="primary">添加</Button>
        <Button style={this.buttonStyle} type="danger">删除</Button>
        <Button style={this.buttonStyle} type="primary">修改</Button>
        <Table
          bordered
          style={{backgroundColor: '#FEFEFE'}}
          dataSource={this.state.userlist}
          columns={this.state.columns}
          rowSelection={this.userRowSelection}
          rowKey="id"
          pagination = {{total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage}}
        ></Table>
        <AddUser close={this.hideAddUserDialog} visible={this.state.showAddUserDialog}></AddUser>
      </div>
    )
  }
}

export default UserMgr