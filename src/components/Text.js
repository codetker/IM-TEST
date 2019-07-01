import React, { PureComponent } from 'react';
import { Register } from './../RenderMsg';

const styles = {
  textStyle: {
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '4px',
    padding: '5px',
    wordBreak: 'break-all',
  }
}

@Register({
  type: 'text',
})
export default class Text extends PureComponent {

  render() {
    const { data } = this.props.data;

    const { content } = data
    return (
      <div style={ styles.textStyle }>{ content }</div>
    );
  }
}