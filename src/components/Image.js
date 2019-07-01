import React, { PureComponent } from 'react';
import { Register } from './../RenderMsg';

const styles = {
  imageWrapper: {
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '200px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100px',
    minHeight: '100px',
    background: 'url(http://mtons.com/store/spd/2018/1215/15014710mamy.gif) no-repeat center center',
    backgroundSize: '20px 20px',
    border: 'none',
  }
}

@Register({
  type: 'image',
})
export default class Image extends React.Component {
  constructor(props) {
    super(props)

    const { data } = props;
    const { content, alt } = data && data.data

    this.state = {
      imgUrl: content || '',
      alt: alt || ''
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.content !== this.state.imageUrl) {
      this.setState({
        imgUrl: nextProps.data.content,
        alt: nextProps.data.alt
      })
    }
  }
  

  loadErrorImage() {
    this.setState({
      imgUrl: ''  // 错误图片，可能还需要绑定点击重新加载的方法
    })
  }

  render() {
    const { imgUrl, alt } = this.state;
    return (
      <div style={ styles.imageWrapper }>
        <img
          style={ styles.imageStyle }
          onError={() => {
            this.loadErrorImage()
          }}
          src={ imgUrl }
          alt={ alt || ''}
          />
      </div>
    );
  }
}