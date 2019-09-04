import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './login.scss';
class Login extends Component {
  render () {
    return (
      <div className="login">
          <div className="top">
            <div className="container">
              <div className="logo-wrap">
                <Link className="logo" to="/">
                </Link>
              </div>
            </div>
          </div>
          <div className="main-bd">
            <div className="login-box-wrap">
              <div className="login-box container">
                <div className="login-group">
                  <div className="input-group">
                    <input type="text"/>
                  </div>
                  <div className="input-group">
                    <input type="text"/>
                  </div>
                  <div className="input-group">
                    <input type="text"/>
                  </div>
                </div>
                <div className="login-aside">
                  右侧
                </div>
              </div>
            </div>
          </div>
          <div className="main-ft">
            &copy;版权所有 aicoder.com 2016-2019
          </div>
      </div>
    )
  }
}
export default Login