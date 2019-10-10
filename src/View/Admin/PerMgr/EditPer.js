import React, { Component } from 'react'
import { Modal, Form, message } from 'antd'
import EditPerFrm from './EditPerFrm';

const EditPerFrmComponent = Form.create({name: 'edit_per'})(EditPerFrm);
class EditPer extends Component {
  handleEditPer = () => {
    this.editFrm.validateFieldsAndScroll((err, values) => {
      if(err) {
        message.error('请填写正确的数据');
        return;
      }
      let newPer = Object.assign({}, this.props.data, values);
      console.log(newPer);
      this.props
        .submitEditPer(newPer)
        .then(res => {
          message.info('修改成功！');
          this.props.close();
        })
        .catch(err => {
          console.log('err :', err);
          message.error('修改失败！');
        })
    });
  }
  editFrm = null;
  render () {
    return (
      <Modal
        visible={this.props.visible}
        destroyOnClose
        okText="修改"
        cancelText="取消"
        onCancel={() => this.props.close()}
        title="修改权限"
        onOk={this.handleEditPer}
      > 
        <EditPerFrmComponent
         ref={frm => this.editFrm = frm}
         data={this.props.data} />
      </Modal>
    )
  }
}

export default EditPer