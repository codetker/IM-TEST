import React, { PureComponent } from 'react';
import { Register } from './../RenderMsg';

const styles = {
  sysTextStyle: {
    // border: '1px solid #999999',
    // borderRadius: '10px',
    textAlign: 'center',
    // fontWeight: 'bold',
    color: '#999999',
    padding: '5px',
  }
}

@Register({
  type: 'sysText',
})
export default class SysText extends PureComponent {

  render() {
    const { data } = this.props.data;

    const { content } = data
    return (
      <div style={ styles.sysTextStyle }>---{ content }---</div>
    );
  }
}