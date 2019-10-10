import React, { Component } from 'react'
import { Form, Input, Icon, Select } from 'antd'

class EditPerFrm extends Component {
  componentDidMount() {
    let { data } = this.props;
    this.props.form.setFieldsValue({
      pId: data.pId, 
      type: data.type, 
      order: data.order,
      des: data.des,
      code: data.code,
      url: data.url,
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    return (
      <Form 
      layout="horizontal"
      labelCol={{span: 4}}
      wrapperCol={{span: 20}}
    >
      <Form.Item label="权限名">
        {getFieldDecorator('des', {
          rules: [
            {
              min: 2,
              max: 20,
              message: '请输入2-20个字符!',
            },
            {
              required: true,
              message: '请输入权限名!',
            }
          ],
        })(
          <Input prefix={<Icon type="smile"></Icon>} 
            placeholder="权限名"
          />
        )}
      </Form.Item>
      <Form.Item label="权限类型">
        {getFieldDecorator('type', {
          rules: [
            {
              required: true,
              message: '请选择权限类型!',
            }
          ],
        })(
          <Select>
            <Option value="menu">菜单权限</Option>
            <Option value="action">请求权限</Option>
            <Option value="router">路由权限</Option>
            <Option value="resource">资源权限</Option>
            <Option value="component">组件权限</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="权限码">
        {getFieldDecorator('code', {
          rules: [
            {
              min: 2,
              max: 20,
              message: '请输入2-20个字符!',
            }
          ],
        })(
          <Input prefix={<Icon type="setting"></Icon>} 
            placeholder="权限码"
          />
        )}
      </Form.Item>
      <Form.Item label="父权限">
        {getFieldDecorator('pId', {
          rules: [
            {
              required: true,
              message: '请输入父权限!',
            }
          ],
        })(
          <Input prefix={<Icon type="user"></Icon>} 
            placeholder="父权限"
          />
        )}
      </Form.Item>
      <Form.Item label="地址">
        {getFieldDecorator('url')(
          <Input prefix={<Icon type="mail"></Icon>} 
            placeholder="地址"
          />
        )}
      </Form.Item>
      <Form.Item label="排序">
        {getFieldDecorator('order')(
          <Input prefix={<Icon type="mail"></Icon>} 
            placeholder="排序"
          />
        )}
      </Form.Item>
    </Form>
    )
  }
}

export default EditPerFrm