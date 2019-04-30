import React from 'react';
import Layout from './components/Layout';
import Item from './components/Item';
import PropTypes from 'prop-types';

const items = [{
  id: 1,
  type: 'link',
  title: 'Link 1',
  url: 'http://localhost:3000/',
  commentsCount: 123,
  by: {
    username: 'me',
  },
  createdAt: 'today',
},
  {
    id: 2,
    type: 'link',
    title: 'Link 1',
    url: 'http://localhost:3000/',
    commentsCount: 123,
    by: {
      username: 'me',
    },
    createdAt: 'today',
  },
];

function App() {
  return (
    <Layout>
      {items.map(item => (
        <Item
          key={item.id}
          {...item}
        />
      ))}
    </Layout>
  );
}

export default App;
