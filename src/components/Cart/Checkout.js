import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = (props) => {
  const [formInputValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isNot6Chars = (value) => value.trim().length !== 6;

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const add = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;
    const enteredNameIsValid = !isEmpty(name);
    const enteredStreetIsValid = !isEmpty(add);
    const enteredPostalIsValid = !isEmpty(postal) && !isNot6Chars(postal);
    const enteredCityIsValid = !isEmpty(city);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
        name: name,
        street: add,
        postal: postal,
        city: city
    })
  };

  const controlClassesName = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const controlClassesStreet = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const controlClassesPostal = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;
  const controlClassesCity = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={controlClassesName}>
        <label htmlFor="name">Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formInputValidity.name && <p>Enter a name</p>}
      </div>
      <div className={controlClassesStreet}>
        <label htmlFor="street">Address</label>
        <input ref={streetRef} type="text" id="street" />
        {!formInputValidity.street && <p>Enter the address</p>}
      </div>
      <div className={controlClassesPostal}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!formInputValidity.postal && <p>ENter a valid postal code</p>}
      </div>
      <div className={controlClassesCity}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formInputValidity.city && <p>Enter a city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
