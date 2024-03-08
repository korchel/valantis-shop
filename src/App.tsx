import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import Shop from '../src/components/Shop';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Shop />
    </Provider>
  );
};

export default App;
