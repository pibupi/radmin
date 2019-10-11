import React, { Component } from 'react'
import { Modal, Row, Col, message, Checkbox } from 'antd'
import { formateDate2String } from '../../../Common/Helper';
import { red } from '@ant-design/colors';
import service from '../../../Service';

class SetPer extends Component {
  state = {
    allPer: [],         // 所有的权限
    userPer: [],        // 用户权限的默认关联
    allCheckedPer: []   // 所有选中的权限
  }
  handleSubmitSetPer = () => {
    let  { userPer, allCheckedPer } = this.state;
    let promiseArr = [];
    // 添加
    allCheckedPer.forEach((per, index) => {
      if(userPer.findIndex(up => up.permissionId === per.id) < 0) {
        // 新添加
        promiseArr.push(service.addUserPer({
          id: Date.now() + index,
          del: 0,
          subon: formateDate2String(new Date()),
          userId: this.props.data.id,
          permissionId: per.id
        }));
      }
    })
    // 删除
    userPer.forEach(up => {
      if(allCheckedPer.findIndex(per => per.id === up.permissionId) < 0) {
        // 删除此权限
        promiseArr.push(service.deleteUserPer(up.id));
      }
    });

    Promise.all(promiseArr)
      .then(res => {
        message.info('设置成功！');
        this.props.close();
      })
      .catch(err => {
        console.log('err :', err);
        message.err('设置失败！');
      })
  }

  handleChangePer = (per, e) => {
    let allCheckedPer = [...this.state.allCheckedPer];
    if(e.target.checked) {
      // 添加到allCheckedPer里面去
      allCheckedPer.push(per);
    } else {
      // 从allCheckedPer里面移除
      allCheckedPer = allCheckedPer.filter(p => per.id !== p.id);
    }
    this.setState({allCheckedPer});
  }
  async componentDidMount() {
    // 加载所有的权限
    let allPer = await service.loadAllPer().then(res => res.data);
    let userPer = await service.loadUserPer(this.props.data.id).then(res => res.data);
    let allCheckedPer = [];
    userPer.forEach(up => {
      let perObj = allPer.find(per=> per.id === up.permissionId);
      if(perObj) allCheckedPer.push(perObj);
    });
    // allCheckedPer
    this.setState({allPer, userPer, allCheckedPer});
  }

  render () {
    let { allPer, userPer } = this.state;
    return (
      <Modal
        title="用户设置权限"
        destroyOnClose
        okText="设置"
        cancelText="取消"
        onCancel={() => this.props.close()}
        visible={this.props.visible}
        onOk={this.handleSubmitSetPer}
      >
       <h3>用户：<span style={{color: red[5]}}>{this.props.data.name}</span>设置权限</h3>
        <hr />
        <Row>
          {
            allPer.map(per => {
              let checked = false;
              checked = userPer.findIndex(up => up.permissionId === per.id) >= 0;
              return (
                <Col key={per.id} span={8}>
                  <Checkbox
                    defaultChecked={checked}
                    onChange={(e) => {this.handleChangePer(per, e)}}
                  >{per.des}</Checkbox>
                </Col>
              );
            })
          }
        </Row>
      </Modal>
    )
  }
}

export default SetPer