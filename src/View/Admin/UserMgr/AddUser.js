import React, { Component } from 'react'
import { Modal, Form } from 'antd';
import AddUserFrm from './AddUserFrm';

const AddUserFrmComponent = Form.create({name: 'adduser_frm'})(AddUserFrm);
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
        <AddUserFrmComponent></AddUserFrmComponent>
      </Modal>
    )
  }
}

export default AddUser