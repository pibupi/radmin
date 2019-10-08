import React, { Component } from 'react'
import { Modal, Form, message } from 'antd';
import EditUserFrm from './EditUserFrm';
import store from '../../../store';
import { EditUserActionAsync } from '../../../Action/UserAction';

const EditUserFrmComponent = Form.create({name: 'edit_frm'})(EditUserFrm);

class EditUser extends Component {
  editFrm = null;
  handleEditUser = () => {
    this.editFrm.validateFields((err, values) => {
      if(err) {
        return;
      }
      // 提交表单
      // this.props.data
      let newUser = {...this.props.data, ...values};
      store
        .dispatch(EditUserActionAsync(newUser))
        .then(res => {
          message.info('修改成功！');
          this.props.close();
        })
        .catch((err) => {
          console.log(err);
          message.error('修改失败！');
        })
    })
  }
  render () {
    return (
      <Modal
        destroyOnClose
        title="修改用户"
        visible={this.props.visible}
        okText="修改"
        cancelText="取消"
        onCancel={()=> {this.props.close()}}
        onOk={this.handleEditUser}
      >
        <EditUserFrmComponent ref={frm => this.editFrm = frm} data={this.props.data}></EditUserFrmComponent>
      </Modal>
    )
  }
}

export default EditUser