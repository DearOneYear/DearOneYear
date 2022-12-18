import React, { useState } from "react";
import "../main/Modal.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };


  return (
    <>
      <img
        src="/img/closedbottle.png"
        alt="유리병"
        onClick={toggleModal}
        className="btn-modal"
      />


      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2 className="myunderline1">2023년 겨울의 유진에게</h2>
            <p className="myunderline1">&nbsp;&nbsp;안녕, 유진아! 잘 지내? 부디 그땐 더 행복한 나였으면 좋겠다. 요즘 뭘 해도 재미가 없고 주위의 멋진 친구들을 보며 초라해지는 것 같기도 해. 그래도 난 언제나 그랬듯이 다시 회복하고 앞으로 나아갈 거야. 그렇지? 지금 이 걱정과 우울함이 지나고 보니 별거 아니었다고 말할 수 있는 2023년의 유진이 되길 바라며, 조금만 쉬고 다시 나아갈게! 언제나 그 누구보다, 세상에서 제일 너를 응원하고 사랑해</p>
            <h2 className="myunderline1">2022년 겨울의 유진이</h2>
          </div>
          <button className="close-modal" onClick={toggleModal}>닫기</button>
        </div>
      )}
    </>
  );
}
