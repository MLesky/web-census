import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from './theme';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </div>
  );
}

export default App;
