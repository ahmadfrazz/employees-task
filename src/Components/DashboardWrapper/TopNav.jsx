import React from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header';

function TopNav({ children }) {
  return (
    <div>
        <Layout>
            <Header />
        </Layout>
        <div style={{padding: '50px 5%', background: '#FBFBFB', minHeight: 'calc(100vh - 25vh)'}}>{children}</div>
    </div>
  )
}

export default TopNav;