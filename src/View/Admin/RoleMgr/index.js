import React, { Component } from 'react'
import { Breadcrumb, Button, Input, Table } from 'antd';
import { Link } from 'react-router-dom';
class RoleMgr extends Component {
  state = {
    roleList: [{
      id: 5,
      pid: 0,
      name: '超级管理员',
      des: '超级管理员',
      subon: '2019-05-08 16:54:26',
      status: 0,
      del: 0}],
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
      dataIndex: 'pid',
      title: '父角色'
    }, {
      key: 'del',
      dataIndex: 'del',
      title: '操作',
      render: (del, row) => {
        return (
          <div>
            <Button type="primary">编辑</Button>
            <Button type="danger">删除</Button>
          </div>
        );
      }
    }]
  }
  handleDelete = () => {}
  handleEdit = () => {}
  handleAdd = () => {}
  buttonStyle ={ margin: '5px'}

  render () {
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
        <Button onClick={ this.handleEdit } style={this.buttonStyle} type="primary">编辑</Button>
        <Input.Search
          placeholder="搜索"
          enterButton
          style={{margin: '5px', width: '300px'}}
        />
        <Table
          bordered
          style={{backgroundColor: '#FEFEFE'}}
          dataSource={this.state.roleList}
          columns={this.state.columns}
          rowKey="id"
          pagination = {{total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage}}
        ></Table>
      </div>
    )
  }
}

export default RoleMgr