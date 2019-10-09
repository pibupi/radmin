import React, { Component } from 'react'
import { Form, Input, Icon } from 'antd';
class AddRoleFrm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({'pId': 0});
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form 
        layout="horizontal"
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
      >
        <Form.Item label="角色名">
          {getFieldDecorator('name', {
            rules: [
              {
                pattern: /\w{2,20}/gi,
                message: '请输入2-20个字符!',
              },
              {
                required: true,
                message: '请输入角色名!',
              }
            ],
          })(
            <Input prefix={<Icon type="smile"></Icon>} 
              placeholder="角色名"
            />
          )}
        </Form.Item>
        <Form.Item label="角色描述">
          {getFieldDecorator('des', {
            rules: [
              {
                pattern: /\w{2,20}/gi,
                message: '请输入2-20个字符!',
              }
            ],
          })(
            <Input prefix={<Icon type="setting"></Icon>} 
              placeholder="角色描述"
            />
          )}
        </Form.Item>
        <Form.Item label="父角色">
          {getFieldDecorator('pId', {
            rules: [
              {
                required: true,
                message: '请输入父角色!',
              }
            ],
          })(
            <Input prefix={<Icon type="user"></Icon>} 
              placeholder="父角色"
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

export default AddRoleFrm