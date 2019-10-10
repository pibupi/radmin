import React, { Component } from 'react'
import { Modal, Form } from 'antd'
import EditPerFrm from './EditPerFrm';

const EditPerFrmComponent = Form.create({name: 'edit_per'})(EditPerFrm);
class EditPer extends Component {
  render () {
    return (
      <Modal
        visible={this.props.visible}
        destroyOnClose
        okText="修改"
        cancelText="取消"
        onCancel={() => this.props.close()}
        title="修改权限"
      > 
        <EditPerFrmComponent data={this.props.data} />
      </Modal>
    )
  }
}

export default EditPer