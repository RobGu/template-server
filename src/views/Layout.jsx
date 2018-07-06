import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <html lang="zh-CN">
        <head>
        <title>
          {this.props.title}
        </title>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
}
