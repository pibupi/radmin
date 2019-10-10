import React, { Component } from 'react'
import { Modal, Form } from 'antd'
import AddPerFrm from './AddPerFrm';

const AddPerFrmComponent = Form.create({name: 'add_per'})(AddPerFrm);

class AddPer extends Component {
  render () {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={() => this.props.close()}
        destroyOnClose
        okText="添加"
        cancelText="取消"
        title="添加权限"
      >
        <AddPerFrmComponent />
      </Modal>
    )
  }
}

export default AddPer