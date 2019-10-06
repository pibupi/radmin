import React, { Component } from 'react'
import { Modal, Form, message } from 'antd';
import AddUserFrm from './AddUserFrm';
import store from '../../../store';
import { AddUserActionAsync } from '../../../Action/UserAction';

const AddUserFrmComponent = Form.create({name: 'adduser_frm'})(AddUserFrm);
class AddUser extends Component {
  userAddFrm = null;
  state = { fileList: []}
  handleSubmit = () => {
    this.userAddFrm.validateFields((err, data) => {
      // console.log(data);
      if(err) {
        return;
      }
      data.del = 0;
      data.id = Date.now(); // json-server 模拟数据。
      data.isTeacher = false;
      // 给上传的头像添加服务器前缀。
      data.avatar = process.env.REACT_APP_BASEURL + data.avatar;
      store
        .dispatch(AddUserActionAsync(data))
        .then(res => {
          message.info('添加成功！');
          // 重置添加对话框和关闭对话框。
          this.hanldeCloseModal();
        })
        .catch((e)=> {
          message.error('添加失败！请重试!');
          console.log(e);
        }); 
    })
  }

  hanldeCloseModal = () => {
    // 清空所有添加的表单。
    this.userAddFrm.resetFields();
    // 清理上传文件
    this.setState({fileList: []});
    this.props.close();
  }
  changeFileList = (fileList) => {
    this.setState({fileList});
  }

  render () {
    return (
      <Modal
        title="添加用户信息"
        okText="确定"
        cancelText="取消"
        visible={this.props.visible}
        onCancel={this.hanldeCloseModal}
        onOk={this.handleSubmit}
      >
        <AddUserFrmComponent
          ref={frm => this.userAddFrm = frm }
          fileList={this.state.fileList}
          changeFileList={this.changeFileList}
        ></AddUserFrmComponent>
      </Modal>
    )
  }
}

export default AddUser