import React, { Component } from 'react'
import { Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
class UserMgr extends Component {
  state = {
    userlist: [{
      id: 1,
      name: 'aicoder',
      phone: '18922222'
    }, {
      id: 2,
      name: 'aicoder2',
      phone: '189222223333'
    }, {
      id: 3,
      name: 'aicoder4',
      phone: '18922222333'
    }],
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

  userRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows);
    }
  }
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
        <Table
          bordered
          style={{backgroundColor: '#FEFEFE'}}
          dataSource={this.state.userlist}
          columns={this.state.columns}
          rowSelection={this.userRowSelection}
          rowKey="id"
        ></Table>
      </div>
    )
  }
}

export default UserMgr