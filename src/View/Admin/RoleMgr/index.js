import React, { Component } from 'react'
import { Breadcrumb, Button, Input, Table } from 'antd';
import { Link } from 'react-router-dom';
import service from '../../../Service';
class RoleMgr extends Component {
  state = {
    params: {
      _page: 1,
      _limit: 6,
      q: '',
      _sort: 'id',
      _order: 'desc' 
    },
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
  loadData = () => {
    service
      .loadRoleList(this.state.params)
      .then(res => {
        this.setState({roleList: res.data, total: parseInt(res.headers['x-total-count'])});
      });
  }
  componentDidMount() {
    this.loadData();
  }
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