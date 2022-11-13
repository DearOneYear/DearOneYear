import dummyLetter from "../dummy/dummyLetter.json";

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

  return (
    <>
      <br />
      <p>아직 볼 수 없어요</p>
      <p>이메일로 편지가 도착하는 날 알려드릴게요!</p>
      {currLetter.sender === currLetter.recipient ? (
        <></>
      ) : (
        <>
          <form>
            <input type="email" />
            <button type="submit">편지 도착 알림 받기</button>
          </form>
        </>
      )}
    </>
  );
};

export default LetterClose;
