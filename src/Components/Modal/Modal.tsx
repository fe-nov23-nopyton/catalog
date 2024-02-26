/* eslint-disable arrow-body-style */
/* eslint-disable react/self-closing-comp */
import React from "react";
import "./Modal.scss";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal__content active" : "modal__content"} onClick={(e) => e.stopPropagation()}>
        <span className="modal__close" onClick={() => setActive(false)}>
          X
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
