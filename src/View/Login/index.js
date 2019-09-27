import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ICON_USER from '../../assets/img/icon_user.gif';
import ICON_LOCK from '../../assets/img/icon_lock.jpg';
import './login.scss';
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      code: ''
    }
  }
  handlerChange = e => {
    let newState = { [e.target.name]: e.target.value};
    this.setState(state => ({...state, ...newState}));
  }
  changeCode(e) {
    e.target.src = '/api/code?id=' + Date.now();
  }
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
                    <img src={ICON_USER} alt="用户名"/>
                    <input name="username" onChange={this.handlerChange} value={this.state.username} placeholder="请输入电话号码" type="text"/>
                  </div>
                  <div className="input-group grey-border">
                    <img src={ICON_LOCK} alt="用户名"/>
                    <input type="password" name="password" onChange={this.handlerChange} value={this.state.password} placeholder="请输入密码" />
                  </div>
                  <div className="code-group input-group">
                    <input name="code" onChange={this.handlerChange} value={this.state.code} type="text" placeholder="请输入验证码" className="code"/>
                    <div className="img-code">
                      <img onClick={ e => this.changeCode(e) } src="/api/code" alt=""/>
                    </div>
                  </div>
                  <div className="login-btn-grop">
                    登录
                  </div>
                  <div className="link-group">
                    忘记密码?
                  </div>
                </div>
                <div className="login-aside">
                  <p>还没注册？</p>
                  <p className="active">立即注册>></p>
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