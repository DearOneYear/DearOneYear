import LetterOpen from "./LetterOpen";
import LetterClose from "./LetterClose";
import { useNavigate } from "react-router-dom";
import dummyLetter from "../letterbox/dummy/dummyLetter.json";

const ReadingLetter = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

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

  return (
    <>
      <h1>...우리 팀 로고...</h1>
      <button onClick={handleGoBack}>뒤로 가기</button>
      {currLetter.sender === currLetter.recipient ? (
        <></>
      ) : (
        <button onClick={onShareClick}>공유하기 🔗</button>
      )}
      <br />
      {currLetter.dday > 0 ? <LetterClose /> : <LetterOpen />}
    </>
  );
};

export default ReadingLetter;
