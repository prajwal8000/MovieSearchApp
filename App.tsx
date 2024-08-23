/* import React from 'react'; 
import { MovieProvider } from './context/movieContext.js';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <MovieProvider>
      <AppNavigator />
    </MovieProvider>
  );
};

export default App; */
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

