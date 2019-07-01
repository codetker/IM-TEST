import React from 'react'
import _ from 'lodash'
import RenderMsg from '../index'
import mockData from './mockData.json'

export default class TestComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    // 拿到请求数据
    Promise.resolve(true).then(() => {
      this.setState({
        data: mockData
      })
    })

    window.addEventListener('scroll', _.throttle(() => {
      /* 根据用户滑动来加载更多历史数据
       * 历史数据可能由于本地清缓存或者网络问题加载失败
       * 无线端根据操作系统选择性绑定 touchmove、scroll 方法，需要判断位移
       * 如果内容太多还需要涉及到节点回收的操作，可能还有事件重新绑定
       */
      if (true) {  // 此处应该判断顶部加载符和渲染内容 scroll 的距离
        this.fetchData()
      }
    }, 200))

    window.addEventListener('data', (response) => {
      // 实时推送的数据，或者用户即时输入的数据，加入渲染列表；注意数据本身可能会加载失败
      const newData = response.data
      this.setState([])
    })
  }

  fetchData() {
    console.log('getMore old data')
  }

  render() {
    const { data } = this.state
    return <RenderMsg data={data} />
  }
}