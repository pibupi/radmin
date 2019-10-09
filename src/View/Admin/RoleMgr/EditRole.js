import React, { Component } from 'react'
import { Modal, Form } from 'antd';
import EditRoleFrm from './EidtRoleFrm';

const EditRoleFrmComponent = Form.create({name: 'frm_edit'})(EditRoleFrm);
class EditRole extends Component {
  handleEditRole = () => {
    this.editFrm.validateFields((err, value) => {
      if(err) return;
      this.props.saveRole(Object.assign({}, this.props.data, value));
    })
  }
  editFrm = null;
  render () {
    return (
      <Modal
        title="修改角色"
        okText="修改"
        cancelText="取消"
        destroyOnClose
        visible={this.props.visible}
        onCancel={()=>this.props.close()}
        onOk={this.handleEditRole}
      >
        <EditRoleFrmComponent 
          ref={frm => this.editFrm = frm} 
          data={this.props.data} 
        />
      </Modal>
    )
  }
}

export default EditRole