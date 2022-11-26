import { Link, useNavigate, useLocation } from "react-router-dom";
import LetterBoxNav from "./LetterBoxNav";
import dummyLetter from "./dummy/dummyLetter.json";
import axios from "axios";
import { useState, useEffect } from "react";

const LetterBoxUnread = () => {
  const location = useLocation();
  const email = location.state.email.userEmail;

  console.log(email);

  let [dbLetter, setDbLetter] = useState([]);
  let [accessToken, setAccessToken] = useState("");

  const getCookie = () => {
    let cookie = document.cookie.split(";");
    let cookieArr = [];
    cookie.map((e) => {
      let c = e.split("=");
      cookieArr.push(c);
    });
    setAccessToken(cookieArr[2][1]);
  };

  const getLetter = async () => {
    await axios
      .get("http://localhost:8000/letter/letterbox/", {
        headers: { Email: `Bearer ${email}` }, // userEmail 앞에서 받은 놈 넣어줍쇼
      })
      .then((res) => {
        setDbLetter([...res.data]);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  dbLetter.map((e) => {
    let open = e.openAt.split("T")[0].split("-");
    e.openYear = open[0];
    e.openMonth = open[1];
    e.openDate = open[2];

    let send = e.sendAt.split("T")[0].split("-");
    e.sendYear = send[0];
    e.sendMonth = send[1];
    e.sendDate = send[2];
  });

  // console.log(dbLetter);

  useEffect(() => {
    getCookie();
    getLetter();
  }, []);

  let unOpenedLetters = [];
  dbLetter.map((l) => {
    if (l.isOpend !== true) {
      unOpenedLetters.push(l);
    }
  });

  console.log(unOpenedLetters);

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

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1>편지함</h1>
      <button onClick={goBack}>뒤로 가기</button>
      <br />
      <br />
      <LetterBoxNav />
      <br />
      {unOpenedLetters.map((letter) => (
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
          {/* <p>D - {letter.remaining_days}</p> */}

          {letter.to_name !== letter.from_name ? (
            <span>{letter.to_name}에게</span>
          ) : (
            <span>나에게</span>
          )}

          {letter.to_name !== letter.from_name ? (
            <span onClick={onShareClick} id={letter.id}>
              🔗
            </span>
          ) : (
            <></>
          )}

          <p>
            {`${letter.sendYear}년 ${letter.sendMonth}월 ${letter.sendDate}일`}→
            {`${letter.openYear}년 ${letter.openMonth}월 ${letter.openDate}일`}
          </p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default LetterBoxUnread;
