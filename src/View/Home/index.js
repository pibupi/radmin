import React, { Component } from 'react'
import { Layout } from 'antd';
import Top from '../../Components/Top';
import MenuBar from '../../Components/MenuBar';
const { Header, Footer, Sider, Content } = Layout;
class Home extends Component {
  render () {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{color: '#fff', padding: '0 15px'}}>
          <Top history={this.props.history}></Top>
        </Header>
        <Layout>
          <Sider style={{backgroundColor: '#FFF'}}>
            <MenuBar history={this.props.history}></MenuBar>
          </Sider>
          <Content>内容</Content>
        </Layout>
        <Footer style={{backgroundColor: 'silver'}}>底部</Footer>
      </Layout>
    )
  }
}

export default Home