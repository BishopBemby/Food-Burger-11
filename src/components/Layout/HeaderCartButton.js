import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import {useContext, useEffect, useState} from 'react';
import CartContext from '../../store/cart-context';
const HeaderCartButton = (props) => {
const [btnBump, setBtnBump] =useState(false);
  const cartCtx = useContext(CartContext);
const {items} = cartCtx;

  useEffect(()=>{
    if(cartCtx.items.length === 0){
      return;
    }
    setBtnBump(true);

    const timer = setTimeout(()=>{
      setBtnBump(false);
    }, 300);

    return () =>{
      clearTimeout(timer);
    }
  }, [items])

  const numberOfCartItems = cartCtx.items.reduce((currentNum, item)=>{
    return currentNum + item.amount;
  }, 0)

const btnClasses = `${classes.button} ${btnBump ? classes.bump: ''}`

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
