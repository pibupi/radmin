import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import TextValidator from '../../Components/TextValidator';
import ICON_USER from '../../assets/img/icon_user.gif';
import ICON_LOCK from '../../assets/img/icon_lock.jpg';
import './login.scss';
import { ValidatorForm } from 'react-form-validator-core';
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
  handleSubmit =() => {
    console.log('submit');
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
                <ValidatorForm 
                  onSubmit={this.handleSubmit}
                  className="login-group"
                >
                  <div className="input-group">
                    <img src={ICON_USER} alt="用户名"/>
                    {/* <input name="username" onChange={this.handlerChange} value={this.state.username} placeholder="请输入电话号码" type="text"/> */}
                    <TextValidator
                      name="username" 
                      onChange={this.handlerChange} 
                      value={this.state.username} 
                      placeholder="请输入电话号码"
                      validators={['required', 'matchRegexp:^[0-9a-zA-Z]{6,12}$']}
                      errorMessages={['*用户名是必填项！', '*请输入6-12个字符！']}
                    ></TextValidator>
                  </div>
                  <div className="input-group grey-border">
                    <img src={ICON_LOCK} alt="用户名"/>
                    <TextValidator 
                      type="password" 
                      name="password" 
                      onChange={this.handlerChange} 
                      value={this.state.password} 
                      placeholder="请输入密码" 
                      validators={['required', 'matchRegexp:^[0-9a-zA-Z]{6,8}$']}
                      errorMessages={['*密码是必填项！', '*请输入6-8']}
                    />
                  </div>
                  <div className="code-group input-group">
                    <TextValidator 
                      name="code" 
                      onChange={this.handlerChange} 
                      value={this.state.code} 
                      type="text" 
                      placeholder="请输入验证码" 
                      className="code"
                      validators={['required', 'matchRegexp:^[0-9a-zA-Z]{6}$']}
                      errorMessages={['*验证码是必填项！', '*请输入6个字符验证码！']}
                    />
                    <div className="img-code">
                      <img onClick={ e => this.changeCode(e) } src="/api/code" alt=""/>
                    </div>
                  </div>
                  <button className="login-btn-grop">
                    登录
                  </button>
                  <div className="link-group">
                    忘记密码?
                  </div>
                </ValidatorForm>
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