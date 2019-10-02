import React, { Component, Fragment } from 'react'
import { Icon } from 'antd';
import './top.scss';

class Top extends Component {
  render () {
    return (
      <Fragment>
        <div className="logo-wrap">
          <a href="/">
            <h1 style={{color: '#fff', fontSize: '30px'}}>
              <Icon type="slack" />
              安心账后台管理系统
            </h1>
          </a>
        </div>
        <div className="user-wrap">
          <div className="btn-group">
            <Icon type="user" />
            用户
          </div>
          <div className="btn-group">
            <Icon type="logout" />
            登出
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Top