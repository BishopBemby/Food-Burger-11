import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalId = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClose={props.close}/>, portalId)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalId)}
    </>
  );
};
export default Modal;
