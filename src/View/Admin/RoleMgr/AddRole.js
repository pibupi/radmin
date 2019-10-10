import React, { Component } from 'react'
import AddRoleFrm from './AddRoleFrm';
import { Modal, Form } from 'antd';

const AddRoleFrmComponent = Form.create({name: 'add_role'})(AddRoleFrm);

class AddRole extends Component {
  handleAddUser = () => {
    this.frmAddRole.validateFields((err, values) => {
      if(err) {
        return;
      }
      this.props.addRole(values);
    });
  }
  frmAddRole = null;
  render () {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={() => this.props.close()}
        onOk={this.handleAddUser}
        destroyOnClose
        title="添加角色"
        okText="添加"
        cancelText="取消"
      >
        <AddRoleFrmComponent ref={frm => this.frmAddRole = frm}></AddRoleFrmComponent>
      </Modal>
    )
  }
}

export default AddRole