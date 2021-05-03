import Modal from '../UI/Modal';
import classes from './Cart.module.css'

const Cart = (props) =>{

    const cartItems = <ul className={classes['cart-items']}>{[{
        id: 'c1',
        name: 'Sushi',
        price: '$3.5',
        amount: 2
    }].map(item=> <li>{item.name}</li>)}</ul>
  return <Modal close={props.onClose}>
      {cartItems}
      <div className={classes.total}>
          <span>Total Amount</span>
          <span>$45.76</span>
      </div>
      <div className={classes.actions}>
          <button className={classes['bitton--alt']} onClick={props.onClose}>Close</button>
          <button className={classes.button}>Order</button>
      </div>
  </Modal>
}

export default Cart;