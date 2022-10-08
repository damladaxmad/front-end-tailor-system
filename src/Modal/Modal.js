import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal} style = {{width: props.pwidth,
    pading: props.ppading, left: props.left}}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const MyModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay pwidth = {props.pwidth} left = {props.left}
        ppading = {props.ppading}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default MyModal;