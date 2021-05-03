import CartContext from './cart-context'
import {useReducer} from 'react';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartreducer = (state, action)=>{
    if(action.type === "ADD_ITEM"){
       
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item=> item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
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