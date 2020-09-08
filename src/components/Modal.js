import React from 'react';

const Modal = ({ show, close, ok }) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        position: 'absolute',
        zIndex: '999',
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      <div className="modal-header">
        <p>Welcome To Our Site</p>
        <span onClick={close} className="close-modal-btn">
          x
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h4>Modal</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus, placeat aliquam? Nostrum vero fugiat rem, itaque
            molestias ipsa quae facilis.
          </p>
        </div>
        <div className="modal-footer">
          <button onClick={ok} className="btn-ok">
            Ok
          </button>
          <button onClick={close} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
