import React, { Component } from 'react'

import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

class MenuBar extends Component {
  state = {
    current: ''
  }
  handleMenuClick = e => {
    // 控制路由跳转
    this.setState({current: e.key})
    this.props.history.push(`/home/${e.key}`);
  }
  render () {
    return (
      <div className="aside-menu-bar">
        <Menu 
          onClick={this.handleMenuClick} 
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            title={
              <span>
                <Icon type="pie-chart" />
                后台管理
              </span>
            }
          >
            <Menu.Item key="user_mgr"><Icon type="codepen-circle" />用户管理</Menu.Item>
            <Menu.Item key="role_mgr"> <Icon type="google" />角色管理</Menu.Item>
            <Menu.Item key="per_mgr"> <Icon type="dribbble" />权限管理</Menu.Item>
          </SubMenu>
          <SubMenu
            title={
              <span><Icon type="ant-design" />商铺管理</span>
            }
          >
            <Menu.Item key="goods_mgr"><Icon type="bug" />商品管理</Menu.Item>
            <Menu.Item key="order_mgr"><Icon type="cloud" />订单管理</Menu.Item>
          </SubMenu>

        </Menu>
      </div>
    )
  }
}

export default MenuBar