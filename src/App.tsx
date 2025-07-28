import './App.css';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import Shop from 'modules/shop/Shop';

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <Shop />
      </Provider>
    </StrictMode>
  );
}

export default App;
