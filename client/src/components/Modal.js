import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ title, content, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    <div onClick={(e) => e.stopPropagation()} className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <span className="delete">
            <FontAwesomeIcon onClick={onDismiss} icon={faTimesCircle} />
          </span>
        </header>
        <section className="modal-card-body">
          <p>{content}</p>
        </section>
        <footer className="modal-card-foot">{actions}</footer>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
