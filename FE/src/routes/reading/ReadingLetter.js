import LetterOpen from "./LetterOpen";
import LetterClose from "./LetterClose";
import new_dummy from "../letterbox/dummy/new_dummy.json";

const ReadingLetter = () => {
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 1]);

  // 백 없이 더미로 작업
  let currLetter = new_dummy;

  return <>{currLetter.dday > 0 ? <LetterClose /> : <LetterOpen />}</>;
};

export default ReadingLetter;
