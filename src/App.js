import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { useState } from "react";

function App() {
  const [cardShow, setCartShow] = useState(false);

  const showCartHandler = () =>{
    setCartShow(true);
  }

  const hideCartHandler = ()=>{
    setCartShow(false);
  }
  return (
    <>
      {cardShow && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
