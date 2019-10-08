import React, { Component } from 'react'
import { Breadcrumb, Table, Button, Modal, message, Avatar, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { LoadUserActionAsync } from '../../../Action/UserAction';
import AddUser from './AddUser';
import service from '../../../Service';
import store from '../../../store';

class UserMgr extends Component {
  state = {
    showAddUserDialog: false,
    unsubscribe: null,
    selectRowKeys: [],
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
    }, {
      key: 'username',
      title: '登录名',
      dataIndex: 'username'
    }, {
      key: 'avatar',
      title: '头像',
      dataIndex: 'avatar',
      render: (avatar) => <Avatar src={avatar}></Avatar>
    }, {
      key: 'del',
      title: '编辑',
      dataIndex: 'del',
      render: (del, row) => {
        return (
          <div>
            <Button style={{marginRight: '5px'}} type="primary">编辑</Button>
            <Popconfirm
              onConfirm={ () => {
                // message.info(row.id);
                this.deleteUser(row.id);
              }}
              okText="确认"
              cancelText="取消"
              title="您确认要删除吗？"
            >
              <Button type="danger" >
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      }
    }]
  }

  deleteUser = (id) => {
    service
      .deleteUser([id])
      .then(res => {
        store.dispatch(LoadUserActionAsync(this.state.params));
        message.info('删除成功！');
        let newSelectRowKeys = this.state.selectRowKeys.filter(item => item !== id);
        this.setState({selectRowKeys: newSelectRowKeys});
      })
      .catch(e => {
        console.log(e);
        message.error('删除失败！');
      });
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

  handleDelete = () => {
    if(this.state.selectRowKeys.length <= 0) {
      message.warn('请选择要删除的数据！');
      return;
    }
    // 拿到所有要删除的数据
    Modal.confirm({
      title: '您确认要删除吗？',
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        // console.log(this.state.selectRowKeys);
        service
          .deleteUser(this.state.selectRowKeys)
          .then(res => {
            store.dispatch(LoadUserActionAsync(this.state.params));
            message.info('删除成功！');
            this.setState({selectRowKeys: []});
          })
          .catch(e => {
            console.log(e);
            message.error('删除失败！');
          })
      }
    })
  }
  buttonStyle = {margin: '5px'};

  render () {
    let { selectRowKeys } = this.state;
    let userRowSelection = {
      selectedRowKeys: selectRowKeys,
      onChange: (selectedRowKeys) => {
        console.log(selectedRowKeys);
        this.setState({selectRowKeys: selectedRowKeys})
      }
    }
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
        <Button onClick={ this.handleDelete } style={this.buttonStyle} type="danger">删除</Button>
        <Button style={this.buttonStyle} type="primary">修改</Button>
        <Table
          bordered
          style={{backgroundColor: '#FEFEFE'}}
          dataSource={this.state.userlist}
          columns={this.state.columns}
          rowSelection={userRowSelection}
          rowKey="id"
          pagination = {{total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage}}
        ></Table>
        <AddUser close={this.hideAddUserDialog} visible={this.state.showAddUserDialog}></AddUser>
      </div>
    )
  }
}

export default UserMgr