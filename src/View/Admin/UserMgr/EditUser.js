import React, { Component } from 'react'
import { Modal } from 'antd';

class EditUser extends Component {
  render () {
    return (
      <Modal
        title="修改用户"
        visible={this.props.visible}
        okText="修改"
        cancelText="取消"
        onCancel={()=> {this.props.close()}}
      >
        修改
      </Modal>
    )
  }
}

export default EditUser