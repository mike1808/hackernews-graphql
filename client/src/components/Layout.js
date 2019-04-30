import './Layout.css';
import React from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="Layout">
      <Header />
      <main>
        <Content>
          {children}
        </Content>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
