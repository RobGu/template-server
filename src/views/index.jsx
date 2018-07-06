import React from 'react';

import Layout from './Layout';

export default class Home extends React.Component {
  render() {
    return (
      <Layout title={this.props.title}>
        <div>
          Hello World!!
        </div>
      </Layout>
    );
  }
}
