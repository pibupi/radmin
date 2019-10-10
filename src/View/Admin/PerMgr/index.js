import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Input, Button, message, Table } from 'antd';
import { Link } from 'react-router-dom';
import { LoadPerAsync, AddPerAsync }  from '../../../Action/PerAction';
import AddPer from './AddPer';
import EditPer from './EditPer';

function mapStateToProps(state) {
  return {
    total: state.PerList.total,
    perList: state.PerList.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadDataAsync: (params) => {
      dispatch(LoadPerAsync(params));
    },
    addPer: (per) => {
      return dispatch(AddPerAsync(per));
    }
  };
}

class PerMgr extends Component {
  state = { 
    showAddPerDialog: false,
    showEditPerDialog: false,
    editPer: null,              // 当前正在编辑的 权限数据对象
    params: {
      _limit: 6,
      _page: 1,
      q: '',
      _sort: 'id',
      _order: 'desc'
    },
    selectedRowKeys: [],
    columns: [{
      key: 'id',
      dataIndex: 'id',
      title: '编号'
    }, {
      key: 'type',
      dataIndex: 'type',
      title: '权限类型'
    }, {
      key: 'des',
      dataIndex: 'des',
      title: '权限描述'
    }, {
      key: 'status',
      dataIndex: 'status',
      title: '权限状态'
    }, 
    // {
    //   key: 'subon',
    //   dataIndex: 'subon',
    //   title: '创建时间'
    // }, 
    {
      key: 'code',
      dataIndex: 'code',
      title: '权限码'
    }, {
      key: 'url',
      dataIndex: 'url',
      title: '地址'
    }, {
      key: 'pId',
      dataIndex: 'pId',
      title: '父权限'
    }, {
      key: 'order',
      dataIndex: 'order',
      title: '排序'
    }, {
      key: 'del',
      dataIndex: 'del',
      title: '编辑',
      render: (del, row) => {
        return (
          <div>
            <Button onClick={() => this.showEditPer(row)} style={{marginRight: '5px'}} type="primary">编辑</Button>
            <Button type="danger">删除</Button>
          </div>
        );
      }
    }]
  }
  showEditPer = (per) => {
    this.setState({
      showEditPerDialog: true,
      editPer: per
    });
  }
  handleAdd = () => {
    this.setState({showAddPerDialog: true});
  }
  handleDelete = () => {}
  handleBarEdit = () => {}
  handleSearch = (value) => {
    this.setState(preState=> {
      let newState = {...preState};
      newState.params.q = value;
      return newState;
    }, () => {
      this.loadData();
    })
  }
  changePage = (page, pageSize) => {}
  loadData = () => {
    this.props.loadDataAsync(this.state.params);
  }
  buttonStyle = {margin: '5px'}

  closeAddPerDialog = () => {
    this.setState({showAddPerDialog: false});
  }
  
  closeEditPerDialog = () =>  {
    this.setState({showEditPerDialog: false});
  }

  // 生命周期的钩子
  componentDidMount() {
    this.loadData();
  }

  render() {
    let { selectedRowKeys } = this.state
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/per_mgr">权限管理</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr/>
        <Button onClick={ this.handleAdd } style={this.buttonStyle} type="primary">添加</Button>
        <Button onClick={ this.handleDelete } style={this.buttonStyle} type="danger">删除</Button>
        <Button onClick={ this.handleBarEdit } style={this.buttonStyle} type="primary">编辑</Button>
        <Input.Search
          placeholder="搜索"
          onSearch = { this.handleSearch }
          enterButton
          style={{margin: '5px', width: '300px'}}
        />
        <Table
          bordered
          style={{backgroundColor: '#FEFEFE'}}
          dataSource={this.props.perList}
          columns={this.state.columns}
          rowKey="id"
          rowSelection = {{
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({selectedRowKeys: selectedRowKeys});
            }
          }}
          pagination = {{total: this.props.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage}}
        ></Table>
        <AddPer
          visible={this.state.showAddPerDialog}
          close={this.closeAddPerDialog}
          addPer={this.props.addPer}
        ></AddPer>
        <EditPer
          visible={this.state.showEditPerDialog}
          close={this.closeEditPerDialog}
          data={this.state.editPer}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerMgr);