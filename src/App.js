import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
  const [cardShow, setCartShow] = useState(false);

  const showCartHandler = () =>{
    setCartShow(true);
  }

  const hideCartHandler = ()=>{
    setCartShow(false);
  }
  return (
    <CartProvider>
      {cardShow && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
