import React, { Component } from 'react'
import {Modal} from 'antd';

class AddUser extends Component {
  render () {
    return (
      <Modal
        title="添加用户信息"
        okText="确定"
        cancelText="取消"
        visible={this.props.visible}
        onCancel={()=>this.props.close()}
      >
        添加用户
      </Modal>
    )
  }
}

export default AddUser