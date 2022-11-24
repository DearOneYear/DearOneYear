import dummyLetter from "../letterbox/dummy/dummyLetter.json";
import { useNavigate } from "react-router-dom";

const LetterClose = () => {
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 1]);

  let letters = dummyLetter.letters;
  let currLetter;

  letters.map((l) => {
    if (l.id === letterId) {
      currLetter = l;
    }
  });

  //링크 공유하기
  let url = document.location.href;
  const onShareClick = () => {
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = url;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("링크가 복사되었습니다.");
  };

  // 뒤로 가기
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1>편지를 기다리는 중..</h1>
      <button onClick={handleGoBack}>뒤로 가기</button>
      {currLetter.sender === currLetter.recipient ? (
        <></>
      ) : (
        <button onClick={onShareClick}>공유하기 🔗</button>
      )}

      <br />
      <h4>도착까지 D - {currLetter.dday}</h4>
      {currLetter.sender === currLetter.recipient ? (
        <>
          <p>
            {currLetter.sendAt[0]}년 {currLetter.sendAt[1]}월{" "}
            {currLetter.sendAt[2]}일에 당신이 보낸 유리병이 아직 세상을 여행하고
            있어요.
          </p>
          <p>유리병이 도착하면 이메일로 알려드릴게요!</p>
        </>
      ) : (
        <>
          <p>
            {currLetter.sendAt[0]}년 {currLetter.sendAt[1]}월{" "}
            {currLetter.sendAt[2]}일,
          </p>
          <p>
            {currLetter.sender} 님이 {currLetter.recipient} 님께 보낸 유리병이
            아직 세상을 여행하고 있어요.
          </p>
          <p>
            아래에 이메일을 남겨주시면 유리병이 도착할 때 이메일로 알려드릴게요!
          </p>
          <form>
            <input type="email" />
            <button type="submit">남기기</button>
          </form>
        </>
      )}
    </>
  );
};

export default LetterClose;
