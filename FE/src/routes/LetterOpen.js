import dummyLetter from "../dummy/dummyLetter.json";

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
    console.log(l);
  });

  return (
    <>
      <br />
      <h3>편지 내용</h3>
      <p>To. {currLetter.recipient}</p>
      <p>{currLetter.message}</p>
      <p>From. {currLetter.sender} </p>

      <br />
      {currLetter.sender === currLetter.recipient ? (
        <button>새로운 편지하기</button>
      ) : (
        <button>답장하기</button>
      )}
    </>
  );
};

export default LetterOpen;
