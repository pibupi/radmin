import React, { Component } from 'react'
import { Modal, Checkbox, Row, Col } from 'antd'
import service from '../../../Service';

class SetRole extends Component {
  state = {
    allRoles: [],    // 所有的角色信息的数组
    userRoles: []    // 当前用户已经管理的所有角色中间表数据
  }
  componentDidMount() {

    // this.props.data  => 当前设置角色的用户信息
    service
      .loadUserRoles(this.props.data.id)
      .then(res => {
        console.log(res.data);
        this.setState({userRoles: res.data}, () => {
          // 加载所有的角色
          service.loadAllRoles()
          .then(res => {
            this.setState({allRoles: res.data});
          });
        });
      });
  }
  render () {
    return (
      <Modal
        title="用户设置角色"
        destroyOnClose
        okText="设置"
        cancelText="取消"
        onCancel={() => this.props.close()}
        visible={this.props.visible}
      >
        <h3>给用户：{this.props.data ? this.props.data.name : null}  设置角色</h3>
        <hr/>
        <Row>
          {
            this.state.allRoles.map(role => {
              let checked = false;
              // 判断当前用户是否已经关联了当前的角色信息
              if(this.state.userRoles.find(userRole => userRole.roleId === role.id)) {
                checked = true;
              }
              return (
                <Col span={8}>
                  <Checkbox defaultChecked={checked}>{role.name}</Checkbox>
                </Col>
              );
            })
          }
        </Row>
      </Modal>
    )
  }
}

export default SetRole