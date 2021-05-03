import CartContext from './cart-context'
import {useReducer} from 'react';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartreducer = (state, action)=>{
    if(action.type === "ADD_ITEM"){
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
      
    }
    if(action.type === "DELETE_ITEM"){

    }
    return defaultCartState;
}

const CartProvider = props =>{

    const [cartState, dispatchCartAction] = useReducer(cartreducer, defaultCartState);

    const addItemHandler = (item)=>{
        dispatchCartAction({type: 'ADD_ITEM', item: item})
    }

    const deleteItemHandler =id =>{
        dispatchCartAction({type: 'DELETE_ITEM', id: id})
    }

    const cartContent = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: deleteItemHandler
    }
  return <CartContext.Provider value={cartContent}>
      {props.children}
  </CartContext.Provider>
}

export default CartProvider;