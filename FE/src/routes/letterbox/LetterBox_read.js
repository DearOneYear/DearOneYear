import { Link, useNavigate, useLocation } from "react-router-dom";
import new_dummy from "./dummy/new_dummy.json";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill, BsLink45Deg } from "react-icons/bs";

const url = "/img/background.png";
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(${url});
  background-repeat: no-repeat;
  background-origin: padding-box;
  background-size: cover;
`;
const Title = styled.p`
  position: relative;
  width: 4.563rem;
  height: 2rem;
  left: 1.5rem;
  top: 5.625rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2rem;

  letter-spacing: 0.02rem;

  color: #ffffff;

  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const Letter = styled.div`
  position: relative;
  width: 19.25rem;
  height: 3.625rem;
  left: 1.688rem;
  top: 1rem;
`;

const LetterTitle = styled.p`
  position: relative;
  height: 1.813rem;
  left: 4.2rem;
  top: -2.625rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.813rem;
  /* identical to box height */

  color: #ffffff;

  /* 기본 그림자 */

  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const LetterPeriod = styled.p`
  position: relative;
  height: 1.813rem;
  left: 4.2rem;
  top: -6.5rem;
  margin: 0;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.813rem;
  /* identical to box height */

  color: #ffffff;

  /* 기본 그림자 */
`;

const NewLetterBtn = styled.button`
  position: relative;
  width: 23.875rem;
  height: 3.563rem;
  top: 29rem;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.5rem -0.063rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;

const NewLetterTxt = styled.p`
  position: relative;
  width: 12.188rem;
  height: 1.5rem;
  top: 32.8rem;
  z-index: 3;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;

const ClosedBottle = styled.img`
  position: relative;
  width: 2.938rem;
  height: 58px;
  top: 2.5rem;
`;

const LetterBoxUnread = () => {
  const navigate = useNavigate();

  // 전역 변수
  let [dbLetter, setDbLetter] = useState([]);
  let [dbDday, setDbDday] = useState([]);
  let [accessToken, setAccessToken] = useState("");

  // 쿠키 받기
  const getCookie = () => {
    let cookie = document.cookie.split(";");
    let cookieArr = [];
    cookie.map((e) => {
      let c = e.split("=");
      cookieArr.push(c);
    });
    setAccessToken(cookieArr[2][1]);
  };

  // 이전 페이지에서 넘겨준 email 값 가져오기
  const location = useLocation();
  const email = location.state.email.email;

  // 이메일로 편지 목록 가져오기
  const getLetter = async () => {
    await axios
      .get("http://localhost:8000/letter/letterbox/", {
        headers: { Email: `Bearer ${email}` },
      })
      .then((res) => {
        setDbLetter([...res.data.letter]);
        setDbDday([...res.data.ddays]);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  console.log(dbDday);
  // 디데이 기존 배열에 합치기
  for (let j = 0; j < dbLetter.length; j++) {
    let d = dbDday[j] + 1;
    dbLetter[j].dday = d;
    if (d === 0) {
      dbLetter[j].ddayinfo = "- DAY";
    } else if (d < 0) {
      dbLetter[j].ddayinfo = `+ ${Math.abs(d)}`;
    }
  }

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

  // 읽은 편지만 분류 및 디데이 순 정렬
  let openedLetters = [];
  dbLetter.map((l) => {
    if (l.isOpened === true) {
      openedLetters.push(l);
    }
  });
  openedLetters = openedLetters.sort(function (a, b) {
    return b.dday - a.dday;
  });
  console.log(openedLetters.dday);

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

  // 편지 열어보기
  const openLetter = (e) => {
    navigate(`/detail/${e.target.id}`);
  };

  useEffect(() => {
    getCookie();
    getLetter();
  }, []);

  return (
    <>
      <Container>
        <p>편지함</p>
        <AiFillHome
          onClick={() => navigate("/")}
          style={{
            color: "white",
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "19.3rem",
            top: "2rem",
          }}
        />
        <BsFillPersonFill
          onClick={() =>
            navigate("/mypage", { state: { email: { userEmail: email } } })
          }
          style={{
            color: "white",
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "20rem",
            top: "2rem",
          }}
        />
        {/* <LetterBoxNav /> */}
        <button
          onClick={() =>
            navigate("/letterbox/unread", {
              state: { email: email },
            })
          }
        >
          기다리는 중
        </button>
        <button>읽은 편지함</button>
        {openedLetters.map((letter) => (
          <div key={letter.id} id={letter.id}>
            <div onClick={openLetter} id={letter.id}>
              <img
                style={{ width: "3rem" }}
                src="/img/opendbottle.png"
                alt="open"
                id={letter.id}
              />
              {letter.to_name !== letter.from_name ? (
                <p id={letter.id}>
                  D {letter.ddayinfo} {letter.to_name}에게
                </p>
              ) : (
                <p id={letter.id}>나에게</p>
              )}
            </div>
            {letter.to_name !== letter.from_name ? (
              <BsLink45Deg
                style={{
                  color: "white",
                  position: "relative",
                  width: "2.125rem",
                  height: "2.125rem",
                  left: "20rem",
                  top: "-6rem",
                }}
                onClick={onShareClick}
                id={letter.id}
              />
            ) : (
              <></>
            )}

            <p>
              {`${letter.sendYear}.${letter.sendMonth}.${letter.sendDate}.`} →{" "}
              {`${letter.openYear}.${letter.openMonth}.${letter.openDate}.`}
            </p>
          </div>
        ))}
        <center>
          <button onClick={() => navigate("/write/write1")}>
            새로운 편지하러 가기
          </button>
        </center>
      </Container>
    </>
  );
};

export default LetterBoxUnread;
