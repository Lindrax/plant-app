import React from 'react';
import { PlantProvider } from './src/context/PlantContext';
import Main from './src/screens/Main';
import ThemeProvider from './src/context/ThemeContext'; // Import the theme provider

const App = () => {
  return (
    <ThemeProvider>
      <PlantProvider>
        <Main />
      </PlantProvider>
    </ThemeProvider>
  );
};

export default App;
