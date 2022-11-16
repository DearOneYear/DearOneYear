import { Link } from "react-router-dom";
import dummyLetter from "../dummy/dummyLetter.json";

const LetterBox = () => {
  let letters = dummyLetter.letters;
  letters.map((l) => {
    let now = new Date();
    let openDay = new Date(`${l.openAt[0]}, ${l.openAt[1]}, ${l.openAt[2]}`);
    let gap = openDay.getTime() - now.getTime();
    let dday = Math.ceil(gap / (1000 * 60 * 60 * 24));
    l.dday = dday;
    if (dday > 0) {
      l.ddayInfo = `D - ${dday}`;
    } else if (dday < 0) {
      l.ddayInfo = `D + ${Math.abs(dday)}`;
    } else if (dday === 0) {
      l.ddayInfo = "D - DAY";
    }
  });
  letters.sort(function (a, b) {
    return a.dday - b.dday;
  });

  //링크 공유하기
  let url = document.location.href;
  const onShareClick = (e) => {
    let shareUrl = url + "/" + e.target.id;
    console.log(shareUrl);
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = shareUrl;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("링크가 복사되었습니다.");
  };

  return (
    <>
      <h1>편지함</h1>
      <button>뒤로 가기</button>
      <br />
      <br />
      {letters.map((letter) => (
        <div key={letter.id} id={letter.id}>
          <Link
            to={`/detail/${letter.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {letter.isOpend === true ? (
              <img style={{ width: "10%" }} src="/img/open.png" alt="open" />
            ) : (
              <img style={{ width: "10%" }} src="/img/close.png" alt="close" />
            )}
            {/* <img style={{ width: "10%" }} src="/img/close.png" alt="close" /> */}
          </Link>
          <p>{letter.ddayInfo}</p>

          {letter.recipient !== letter.sender ? (
            <span>{letter.sender} 에게</span>
          ) : (
            <span>나에게</span>
          )}

          {letter.recipient !== letter.sender ? (
            <span onClick={onShareClick} id={letter.id}>
              🔗
            </span>
          ) : (
            <></>
          )}

          <p>
            {`${letter.sendAt[0]}년 ${letter.sendAt[1]}월 ${letter.sendAt[2]}일`}
            →
            {`${letter.openAt[0]}년 ${letter.openAt[1]}월 ${letter.openAt[2]}일`}
          </p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default LetterBox;
