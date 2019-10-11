import React, { Component } from 'react'
import { blue } from '@ant-design/colors';

class SetRolePer extends Component {
  render () {
    return (
      <div>
        <h3>给角色：<span style={{color: blue[5]}}>{this.props.data.name} </span>设置权限</h3>
        <hr />
      </div>
    )
  }
}

export default SetRolePer