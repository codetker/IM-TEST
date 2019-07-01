/* 
  写一个类似微信的渲染消息流的组件，支持不同类型：

  1.文本 
  2.图片 
  3.系统消息，例如加某个人到群组里，撤销消息 

  要求考虑可扩张性，具体UI可以简单实现 
*/

import React from 'react'

const renderers = []
const styles = {
  noDataText: {
    color: '#999999',
    textAlign: 'center'
  },
  bfc: {
    overflow: 'hidden'
  },
  leftStyle: {
    float: 'left',
    margin: '5px 0 5px 5px'
  },
  rightStyle: {
    float: 'right',
    maxWidth: '80%',
    margin: '5px 5px 5px 0',
  },
  sysStyle: {
    with: '100%',
    margin: '5px',
  }
}

export default class RenderMsgComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    if (data.length) {
      return data.map((item, index) => {
        const config = renderers.find(obj => obj.type === item.type)

        return config ? (
          <config.Component key={`${item.type}-${index}`} data={item} />
        ) : null
      })
    } else {
      return (
        <div style={styles.noDataText}>
          ---暂无数据---
        </div>
      )
    }
  }
}

// 注册组件封装，可以用来添加通用逻辑：国际化、埋点、通用渲染样式修改、撤回样式等
const composeRender = (ComposedComponent) => {
  class newComponent extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      const { data } = this.props
      const isSelf = data && data.senderMsg && data.senderMsg.isSelf
      const isSys = data && data.isSys
      if (isSys) {
        return (
          <div style={ styles.sysStyle }>
            <ComposedComponent {...this.props} />
          </div>
        )
      }
      return (
        <div style={ styles.bfc }>
          <div style={ isSelf ? styles.rightStyle : styles.leftStyle }>
            <ComposedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }

  return newComponent
}

// 组件注册，保证唯一性
export const Register = (config, ...args) => Component => {
  if (!config.type || !Component instanceof React.Component) {
    throw new Error('组件注册失败：注册的组件缺少必要属性 type 或者不是一个 react component!')
  } else if (renderers.findIndex(item => item.type === config.type) > -1) {
    throw new Error(`组件${config.type}已经注册过！不能重复注册！`)
  }
  config.Component = composeRender(Component)
  renderers.push(config)

  return Component
}