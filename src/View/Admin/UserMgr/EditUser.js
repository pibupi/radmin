import React, { Component } from 'react'
import { Modal, Form } from 'antd';
import EditUserFrm from './EditUserFrm';

const EditUserFrmComponent = Form.create({name: 'edit_frm'})(EditUserFrm);

class EditUser extends Component {
  render () {
    return (
      <Modal
        destroyOnClose
        title="修改用户"
        visible={this.props.visible}
        okText="修改"
        cancelText="取消"
        onCancel={()=> {this.props.close()}}
      >
        <EditUserFrmComponent data={this.props.data}></EditUserFrmComponent>
      </Modal>
    )
  }
}

export default EditUser