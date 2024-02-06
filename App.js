import * as React from 'react';

import TodoApp from './screens/TodoApp';

// Import Redux
import store from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  );
}

export default App;

