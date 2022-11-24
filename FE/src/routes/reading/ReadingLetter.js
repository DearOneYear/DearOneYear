import LetterOpen from "./LetterOpen";
import LetterClose from "./LetterClose";
import dummyLetter from "../letterbox/dummy/dummyLetter.json";

const ReadingLetter = () => {
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

  return <>{currLetter.dday > 0 ? <LetterClose /> : <LetterOpen />}</>;
};

export default ReadingLetter;
