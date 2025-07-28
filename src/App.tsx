import './App.css';
import { store } from './store/store.ts';
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
        <ThemeProvider theme={theme}>
          <Shop />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}

export default App;
