import React, { Component } from 'react'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
class Home extends Component {
  render () {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{color: '#fff'}}>顶部</Header>
        <Layout>
          <Sider style={{backgroundColor: 'silver'}}>左侧</Sider>
          <Content>内容</Content>
        </Layout>
        <Footer style={{backgroundColor: 'silver'}}>底部</Footer>
      </Layout>
    )
  }
}

export default Home