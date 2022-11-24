import dummyLetter from "../letterbox/dummy/dummyLetter.json";
import { useNavigate, Link } from "react-router-dom";

const LetterOpen = () => {
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 1]);

  let letters = dummyLetter.letters;
  let currLetter;

  letters.map((l) => {
    if (l.id === letterId) {
      currLetter = l;
      l.isOpend = true;
    }
  });

  // 뒤로 가기
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1>편지가 도착했어요</h1>
      <button onClick={handleGoBack}>뒤로 가기</button>
      {currLetter.sender === currLetter.recipient ? (
        <>
          <p>
            {currLetter.sendAt[0]}년 {currLetter.sendAt[1]}월{" "}
            {currLetter.sendAt[2]}일,
          </p>

          <p>
            뭐뭐하고 싶었던 당신이 보낸 유리병이 --- 일 동안 세상을 여행하고
            당신께 돌아왔어요.
          </p>
        </>
      ) : (
        <>
          <p>
            {currLetter.sendAt[0]}년 {currLetter.sendAt[1]}월{" "}
            {currLetter.sendAt[2]}일,
          </p>
          <p>
            뭐뭐하고 싶었던 {currLetter.sender} 님이 보낸 유리병이 ---일 동안
            세상을 여행하고 {currLetter.recipient} 님께 도착했어요.
          </p>
        </>
      )}
      <p>유리병을 눌러 편지를 열어볼까요?</p>

      <Link to={`/detail/${currLetter.id}/gift`}>
        <button>유리병</button>
      </Link>

      <br />
    </>
  );
};

export default LetterOpen;
