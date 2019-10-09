import React, { Component } from 'react'
import AddRoleFrm from './AddRoleFrm';
import { Modal, Form } from 'antd';

const AddRoleFrmComponent = Form.create({name: 'add_role'})(AddRoleFrm);

class AddRole extends Component {
  render () {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={() => this.props.close()}
        destroyOnClose
        title="添加角色"
        okText="添加"
        cancelText="取消"
      >
        <AddRoleFrmComponent></AddRoleFrmComponent>
      </Modal>
    )
  }
}

export default AddRole