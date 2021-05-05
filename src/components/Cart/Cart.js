import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

import CartItem from "./CartItem";
import Card from "../UI/Card";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          //   try to remove bind, will give error as with bind you ensure the item is bind to the fundtion scope.
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setShowCheckout(true);
  };
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const onSubmitHandler = async (userData) => {
    setIsSubmit(true);
    const data = await fetch(
      "https://reacthttp-f4741-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (data.ok) {
      setIsSubmit(false);
      setDidSubmit(true);
    }

    cartCtx.clearCart();
  };

  const cardModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onConfirm={onSubmitHandler} onCancel={props.onClose} />
      )}
      {!showCheckout && modalActions}
    </>
  );
  const isSubmittingContent = <p>Submitting Data.....</p>;
  const didSubmitContent = (
    <>
      <Card>Your order was successful!!!</Card>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal close={props.onClose}>
      {!isSubmit && !didSubmit && cardModalContent}
      {isSubmit && isSubmittingContent}
      {didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
