import React, { Component } from 'react'
import { Breadcrumb, Button, Input, Table, message, Modal, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import service from '../../../Service';
import AddRole from './AddRole';
import EditRole from './EditRole';
import SetRolePer from './SetRolePer';
import { formateDate2String } from '../../../Common/Helper';

class RoleMgr extends Component {
  state = {
    showAddRoleDialog: false,
    showEidtRoleDialog: false,
    showSetRolePerDialog: false,
    selectedRowKeys: [],
    params: {
      _page: 1,
      _limit: 6,
      q: '',
      _sort: 'id',
      _order: 'desc' 
    },
    setRolePer: null,
    total: 0,
    roleList: [],
    columns: [{
      key: 'id',
      dataIndex: 'id',
      title: '编号'
    }, {
      key: 'name',
      dataIndex: 'name',
      title: '角色名'
    }, {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      render: (status, row) => <span>{status === 0 ? '启用':'禁用'}</span>
    }, {
      key: 'subon',
      dataIndex: 'subon',
      title: '提交时间'
    }, {
      key: 'pid',
      dataIndex: 'pId',
      title: '父角色'
    }, {
      key: 'del',
      dataIndex: 'del',
      title: '操作',
      render: (del, row) => {
        return (
          <div>
            <Button 
              type="primary" 
              style={{marginRight: '5px'}}
              onClick={() => this.handleEdit(row)}
            >
              编辑
            </Button>
            <Popconfirm
              title="您确认要删除吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                service
                  .deleteRoles([row.id])
                  .then(res => {
                    message.info('删除成功！');
                    this.loadData();
                    // 重置当前的selectedRowKeys
                    this.setState({selectedRowKeys: this.state.selectedRowKeys.filter(item => item !== row.id)});
                  })
                  .catch(err => {
                    console.log(err);
                    message.error('删除失败！');
                  });
              }}
            >
              <Button type="danger">删除</Button>
            </Popconfirm>
          </div>
        );
      }
    }]
  }
  handleDelete = () => {
    Modal.confirm({
      title: '您确认要删除吗？',
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        // 拿到要删除的数据的id
        service
          .deleteRoles(this.state.selectedRowKeys)
          .then(res => {
            message.info('删除成功！');
            this.loadData();
            this.setState({selectedRowKeys: []});
          })
          .catch(err => {
            console.log(err);
            message.error('删除失败！');
          });
      }
    })
    
  }
  handleBarEdit = () => {
    if(this.state.selectedRowKeys.length !== 1) {
      message.error('请选中一行进行编辑');
      return;
    }

    let editRole = this.state.roleList.find(item => item.id === this.state.selectedRowKeys[0]);
    if(editRole) this.handleEdit(editRole);
  }
  handleEdit = (row) => {
    this.setState({showEidtRoleDialog: true, editRole: row});
  }
  saveRole = (role) => {
    service
      .saveRole(role)
      .then(res => {
        this.closeEditDialog();
        this.loadData();
        message.info('修改成功！');
      })
      .catch(err => {
        console.log(err);
        message.error('修改失败！');
      })
  }
  handleAdd = () => {
    this.setState({showAddRoleDialog: true});
  }
  addRole = (role) => {
    let newRole = Object.assign({
      id: Date.now(),
      del: 0,
      subon: formateDate2String(new Date()),
      status: 0
    },role);
    console.log(newRole);
    service
      .addRole(newRole)
      .then(res => {
        message.info('添加成功！');
        // 关闭对话框
        this.closeAddDialog();
        this.loadData();
      })
      .catch(err => {
        console.log(err);
        message.error('添加失败！');
      })
  }
  handleSearch = (value) => {
    this.setState(preState => {
      preState.params.q = value;
      return {...preState};
    }, () => {
      this.loadData();
    });
  }
  loadData = () => {
    service
      .loadRoleList(this.state.params)
      .then(res => {
        this.setState({roleList: res.data, total: parseInt(res.headers['x-total-count'])});
      });
  }
  changePage = (page, pageSize) => {
    this.setState(preState => {
      preState.params._page = page;
      preState.params._limit = pageSize;
      return {...preState};
    }, () => {
      this.loadData();
    })
  }

  closeAddDialog = () => {
    this.setState({showAddRoleDialog: false});
  }
  closeEditDialog = () => {
    this.setState({showEidtRoleDialog: false});
  }
  handleSetRolePer = () => {
    if(this.state.selectedRowKeys.length !== 1) {
      message.error('请选择一条角色进行设置权限！');
      return;
    }
    // roleId => selectedRowKeys[0]
    let setRole = this.state.roleList.find(item => item.id === this.state.selectedRowKeys[0]);
    this.setState({showSetRolePerDialog: true, setRolePer: setRole});
  }

  componentDidMount() {
    this.loadData();
  }
  buttonStyle ={ margin: '5px'}

  render () {
    let { selectedRowKeys } = this.state;
    let setRolePerCom = null;
    return (
      <div>
         <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/role_mgr">角色</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr/>
        <Button onClick={ this.handleAdd } style={this.buttonStyle} type="primary">添加</Button>
        <Button onClick={ this.handleDelete } style={this.buttonStyle} type="danger">删除</Button>
        <Button onClick={ this.handleBarEdit } style={this.buttonStyle} type="primary">编辑</Button>
        <Button onClick={ this.handleSetRolePer } style={this.buttonStyle} type="danger">设置权限</Button>
        <Input.Search
          placeholder="搜索"
          onSearch = { this.handleSearch }
          enterButton
          style={{margin: '5px', width: '300px'}}
        />
        <Table
          bordered
          style={{backgroundColor: '#FEFEFE'}}
          dataSource={this.state.roleList}
          columns={this.state.columns}
          rowKey="id"
          rowSelection = {{
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({selectedRowKeys: selectedRowKeys});
              console.log(selectedRowKeys);
            }
          }}
          pagination = {{total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage}}
        ></Table>
        <AddRole 
          close={this.closeAddDialog} 
          visible={this.state.showAddRoleDialog}
          addRole={this.addRole}
        ></AddRole>
        <EditRole 
          visible={this.state.showEidtRoleDialog} 
          close={this.closeEditDialog}
          data={this.state.editRole}
          saveRole={this.saveRole}
        />
        <Modal
          visible={this.state.showSetRolePerDialog}
          title="设置角色的权限"
          okText="设置"
          cancelText="取消"
          onCancel={()=> this.setState({showSetRolePerDialog: false})}
          onOk={()=> {
            setRolePerCom.hanldeSubmitSetRolePer();
          }}
        >
          {
            this.state.showSetRolePerDialog ?
              <SetRolePer close={()=>this.setState({showSetRolePerDialog: false})} ref={setRP => setRolePerCom = setRP } data={this.state.setRolePer} />
              :
              null
          }
        </Modal>
      </div>
    )
  }
}

export default RoleMgr