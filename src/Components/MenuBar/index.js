import React, { Component } from 'react'

import { Menu } from 'antd';
const { SubMenu } = Menu;

class MenuBar extends Component {
  state = {
    current: 'user_mgr'
  }
  handleMenuClick = e => {
    console.log(e);
    // 控制路由跳转
    this.setState({current: e.key})
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
            title="后台管理"
          >
            <Menu.Item key="user_mgr">用户管理</Menu.Item>
            <Menu.Item key="role_mgr">角色管理</Menu.Item>
            <Menu.Item key="per_mgr">权限管理</Menu.Item>
          </SubMenu>
          <SubMenu
            title="商铺管理"
          >
            <Menu.Item key="goods_mgr">商品管理</Menu.Item>
            <Menu.Item key="order_mgr">订单管理</Menu.Item>
          </SubMenu>

        </Menu>
      </div>
    )
  }
}

export default MenuBar