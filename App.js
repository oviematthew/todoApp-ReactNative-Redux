import * as React from 'react';
import {useState, useEffect} from 'react'
import TodoApp from './screens/TodoApp';

// Import Redux
import store from './redux/store';
import { Provider } from 'react-redux';
import { load } from './components/database/config';

export default function App () {

  return (
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  );
};

