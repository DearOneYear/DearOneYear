import React, { useState } from "react";
import "../main/Modal.css";

export default function Modal() {
  
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  // <img src='/img/closedbottle.png' onClick={toggleModal} className="btn-modal"/>

  return (
    <>
      
      <img src='/img/closedbottle.png' onClick={toggleModal} className="btn-modal"/>

      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>내용입니다</p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
