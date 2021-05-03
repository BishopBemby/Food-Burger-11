import CartContext from './cart-context'


const CartProvider = props =>{

    const addItemHandler = (item)=>{}

    const deleteItemHandler =id =>{}

    const cartContent = {
        items: [],
        totalAmount: 0,
        addItem: addItemHandler,
        removeItem: deleteItemHandler
    }
  return <CartContext.Provider value={cartContent}>
      {props.children}
  </CartContext.Provider>
}

export default CartProvider;