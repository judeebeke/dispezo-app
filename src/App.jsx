import React from 'react';
import Pages from './components/pages';
import ContextProvider from './store/CartProvider';


const App = () => {
  return (
    <ContextProvider>
      <Pages />
    </ContextProvider>
  )
}

export default App

