import React, { Component } from 'react'
import { Breadcrumb, Table, Button, Modal, message, Avatar, Popconfirm, Input } from 'antd';
import { Link } from 'react-router-dom';
import { LoadUserActionAsync } from '../../../Action/UserAction';
import AddUser from './AddUser';
import EditUser from './EditUser';
import SetRole from './SetRole';
import SetPer from './SetPer';
import service from '../../../Service';
import store from '../../../store';

class UserMgr extends Component {
  state = {
    showSetRoleDialog: false,  // 显示设置用户角色对话框
    showSetPerDialog: false,   // 显示设置用户权限对话框
    showAddUserDialog: false,  // 显示要添加用户的对话框
    showEditUserDialog: false, // 显示修改的对话框
    editUserRow: null,         // 当前编辑的用户信息 
    setRoleUser: null,         // 当前设置角色的用户
    setPerUser: null,          // 当前设置权限的用户数据
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
            <Button 
              onClick={()=> this.setState({showEditUserDialog: true, editUserRow: row})}
              style={{marginRight: '5px'}} type="primary"
            >
              编辑
            </Button>
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

  changePage = (page, pageSize, q="") => {
    if(!!q) {
      q = this.state.params.q;
    }
    this.setState(preState=> {
      return {...preState, ...{params: {_page: page, _limit: pageSize, q}}}
    }, ()=> {
      store.dispatch(LoadUserActionAsync(this.state.params));
    });
  }

  hideAddUserDialog = () => {
    this.setState({showAddUserDialog: false});
  }

  hideEditUserDialog = () => {
    this.setState({showEditUserDialog: false});
  }
  hideSetRoleDialog = () => {
    this.setState({showSetRoleDialog: false});
  }
  hideSetPerDialog = () => {
    this.setState({showSetPerDialog: false});
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

  handleEdit = () => {
    if(this.state.selectRowKeys.length !== 1) {
      message.error('请选中一条数据进行编辑！');
      return;
    }

    // 拿到要进行编辑的数据
    const userId = this.state.selectRowKeys[0]
    let editUser = store.getState().UserList.list.find(item => item.id === userId);
    console.log(editUser);
    this.setState({
      showEditUserDialog: true,
      editUserRow: editUser
    })
  }
  handleSetRole = () => {
    if(this.state.selectRowKeys.length !== 1) {
      message.error('请选中一条用户进行设置角色!');
      return;
    }
    let setRoleUserId = this.state.selectRowKeys[0];
    let setRoleUser = this.state.userlist.find(item => item.id === setRoleUserId);
    this.setState({showSetRoleDialog: true, setRoleUser: setRoleUser});
  }
  handleSetPer = () => {
    if(this.state.selectRowKeys.length !== 1) {
      message.error('请选中一条用户进行设置权限!');
      return;
    }
    let setPerUserId = this.state.selectRowKeys[0];
    let setPerUser = this.state.userlist.find(item => item.id === setPerUserId);
    this.setState({showSetPerDialog: true, setPerUser: setPerUser});
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
        <Button onClick={ this.handleEdit } style={this.buttonStyle} type="primary">编辑</Button>
        <Button onClick={ this.handleSetRole } style={this.buttonStyle} type="danger">设置角色</Button>
        <Button onClick={ this.handleSetPer } style={this.buttonStyle} type="primary">设置权限</Button>
        <Input.Search
          placeholder="搜索"
          onSearch={(value) => {
            // 第一步： 先把搜索的参数放到 state 里面去。
            this.setState(preState => {
              preState.params.q = value;
              return {...preState};
            }, () => {
              // 第二步： 重新请求当前页数据
              this.changePage(1, 6, value);
            })
          }}
          enterButton
          style={{margin: '5px', width: '300px'}}
        />
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
        <EditUser data={this.state.editUserRow} close={this.hideEditUserDialog} visible={this.state.showEditUserDialog}></EditUser>
        {
          this.state.showSetRoleDialog ?
            <SetRole data={this.state.setRoleUser} close={this.hideSetRoleDialog} visible={this.state.showSetRoleDialog} />
            :
            null
        }
        {
          this.state.showSetPerDialog ?
            <SetPer data={this.state.setPerUser} close={this.hideSetPerDialog} visible={this.state.showSetPerDialog} />
            :
            null
        }
      </div>
    )
  }
}

export default UserMgr