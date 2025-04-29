import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cartAmount, setCartAmount] = useState(200); // Example default cart amount

  const getTotalCartAmount = () => {
    return cartAmount;
  };

  return (
    <StoreContext.Provider value={{ getTotalCartAmount }}>
      {children}
    </StoreContext.Provider>
  );
};
