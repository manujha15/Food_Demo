import React from 'react';
import PlaceOrder from './PlaceOrder/PlaceOrder';  // adjust the path as necessary
import { StoreProvider } from './context/StoreContext'; // Adjust if necessary
import MyOrders from './pages/MyOrders/MyOrders';

function App() {
  return (
    <StoreProvider>
      <div>
        <Routes>
          <Route path='/' element={<PlaceOrder/>}/>
          <Route path='/myOrders' element={<MyOrders/>}/>
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;
