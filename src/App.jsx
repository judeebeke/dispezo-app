import React from 'react';
import Pages from '../src/components/Pages';
import ContextProvider from './store/CartProvider';


const App = () => {
  return (
    <ContextProvider>
      <Pages />
    </ContextProvider>
  )
}

export default App

