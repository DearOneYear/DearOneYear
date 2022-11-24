import dummyLetter from "./dummy/dummyLetter.json";
import { Link, useNavigate } from "react-router-dom";
import LetterBoxNav from "./LetterBoxNav";
import { useState, useEffect } from "react";
import axios from "axios";

const LetterBoxRead = () => {
  let [dbLetter, setDbLetter] = useState([]);
  let [accessToken, setAccessToken] = useState('');

  const getCookie = () => {
    let cookie = document.cookie.split(';');
    let cookieArr = [];
    cookie.map((e) => {
      let c = e.split('=');
      cookieArr.push(c);
    });
    setAccessToken(cookieArr[2][1]);
  }


  const getLetter = async () => { 
    await axios.get('http://localhost:8000/letter/postbox/', { headers: { Authorization: `Bearer ${accessToken}`} }).then((res) => {
    setDbLetter([...res.data]);
  }).catch(function (err) {
    console.log(err)
  });
  }  
    

  dbLetter.map((e) => {
    let open = e.openAt.split('T')[0].split('-');
    e.openYear = open[0];
    e.openMonth = open[1];
    e.openDate = open[2];
    
    let send = e.sendAt.split('T')[0].split('-');
    e.sendYear = send[0];
    e.sendMonth = send[1];
    e.sendDate = send[2];
  })

  // console.log(dbLetter);

  useEffect(() => {
    getCookie();
    getLetter();
  }, []);





  let openedLetters = [];
  dbLetter.map((l) => {
    if (l.isOpend === true) {
      openedLetters.push(l);
    }
  });

  console.log(openedLetters);

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

      {openedLetters.map((letter) => (
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

export default LetterBoxRead;
