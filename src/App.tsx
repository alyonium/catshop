import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import Shop from 'modules/shop/Shop';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f08080',
    },
  },
});

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Shop />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}

export default App;
