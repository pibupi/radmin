import React, { Component } from 'react'
import { Form, Input, Icon } from 'antd';

class EditUserFrm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      name: this.props.data.name,
      username: this.props.data.username,
      mail: this.props.data.mail,
      phone: this.props.data.phone,
      password: this.props.data.password
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form 
        layout="horizontal"
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
      >
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [
              {
                pattern: /\w{6,20}/gi,
                message: '请输入6-20个字符!',
              },
              {
                required: true,
                message: '请输入用户名!',
              }
            ],
          })(
            <Input prefix={<Icon type="user"></Icon>} 
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [
              {
                pattern: /\w{6,20}/gi,
                message: '请输入6-20个字符!',
              },
              {
                required: true,
                message: '请输入密码!',
              }
            ],
          })(
            <Input.Password prefix={
              <Icon type="safety" />
            } 
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator('mail', {
            rules: [
              {
                type: 'email',
                message: '请输入正确的邮箱格式!',
              },
              {
                required: true,
                message: '请输入邮箱!',
              }
            ],
          })(
            <Input prefix={<Icon type="mail"></Icon>} 
              placeholder="邮箱"
            />
          )}
        </Form.Item>
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                min: 2,
                message: '请输入大于2个字符!',
              },
              {
                required: true,
                message: '请输入姓名!',
              }
            ],
          })(
            <Input prefix={<Icon type="user"></Icon>} 
              placeholder="姓名"
            />
          )}
        </Form.Item>
        <Form.Item label="电话">
          {getFieldDecorator('phone', {
            rules: [
              {
                pattern: /\d{11}/gi,
                message: '请输入11个字符!',
              }
            ],
          })(
            <Input prefix={<Icon type="phone"></Icon>} 
              placeholder="电话"
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default EditUserFrm
