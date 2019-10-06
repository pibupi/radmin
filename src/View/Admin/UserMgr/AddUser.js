import React, { Component } from 'react'
import { Modal, Form } from 'antd';
import AddUserFrm from './AddUserFrm';

const AddUserFrmComponent = Form.create({name: 'adduser_frm'})(AddUserFrm);
class AddUser extends Component {
  userAddFrm = null;
  handleSubmit = () => {
    this.userAddFrm.validateFields(function(err, data){
      // console.log(err);
      // console.log(data);
      if(!err) {
        // ajax
      }
    })
  }

  render () {
    return (
      <Modal
        title="添加用户信息"
        okText="确定"
        cancelText="取消"
        visible={this.props.visible}
        onCancel={()=> {
          this.userAddFrm.resetFields();
          this.props.close();
        }}
        onOk={this.handleSubmit}
      >
        <AddUserFrmComponent ref={frm => this.userAddFrm = frm }></AddUserFrmComponent>
      </Modal>
    )
  }
}

export default AddUser