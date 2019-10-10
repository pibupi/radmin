import React, { Component } from 'react'
import { Modal } from 'antd'

class SetRole extends Component {
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
      </Modal>
    )
  }
}

export default SetRole