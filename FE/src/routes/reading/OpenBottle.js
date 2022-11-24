import { useNavigate } from "react-router-dom";
import dummyLetter from "../letterbox/dummy/dummyLetter.json";

const OpenBottle = () => {
  // 뒤로 가기
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 2]);

  let letters = dummyLetter.letters;
  let currLetter;

  letters.map((l) => {
    if (l.id === letterId) {
      currLetter = l;
      l.isOpend = true;
    }
  });

  return (
    <>
      <h1>편지가 도착했어요</h1>
      <button onClick={handleGoBack}>뒤로 가기</button>
      <br />
      <p>To. {currLetter.recipient}</p>
      <p>{currLetter.message}</p>
      <p>From. {currLetter.sender}</p>
      <br />
      <button>새로운 편지 하러 가기</button>
    </>
  );
};

export default OpenBottle;
