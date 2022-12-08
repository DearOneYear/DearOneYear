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

const LetterBoxUnread = () => {
  const navigate = useNavigate();

  // 전역 변수
  let [dbLetter, setDbLetter] = useState([]);
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
  const email = location.state.email;
  console.log(email);

  // 이메일로 편지 목록 가져오기
  const getLetter = async () => {
    await axios
      .get("http://localhost:8000/letter/letterbox/", {
        headers: { Email: `Bearer ${email}` },
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

  // 안 읽은 편지만 분류
  let unOpenedLetters = [];
  dbLetter.map((l) => {
    if (l.isOpend !== true) {
      unOpenedLetters.push(l);
    }
  });

  //링크 공유하기
  const onShareClick = (e) => {
    let url = document.location.href.split("/");
    let shareUrl =
      url.splice(0, url.length - 2).join("/") + "/detail/" + e.target.id;
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
        <button>기다리는 중</button>
        <button
          onClick={() =>
            navigate("/letterbox/read", { state: { email: { email } } })
          }
        >
          읽은 편지함
        </button>
        {unOpenedLetters.map((letter) => (
          <div key={letter.id} id={letter.id}>
            <div onClick={openLetter} id={letter.id}>
              <p></p>
              {letter.isOpend !== true ? (
                <img
                  style={{ width: "3rem" }}
                  src="/img/redletterbox.png"
                  alt="open"
                  id={letter.id}
                />
              ) : (
                <img
                  src="/img/closedbottle.png"
                  alt="close"
                  id={letter.id}
                  style={{ width: "3rem" }}
                />
              )}

              {letter.to_name !== letter.from_name ? (
                <p id={letter.id}>
                  D {letter.dday} {letter.to_name}에게
                </p>
              ) : (
                <p id={letter.id}>D {letter.dday}</p>
              )}
            </div>
            {letter.to_name !== letter.from_name ? (
              <div onClick={onShareClick} id={letter.id}>
                <BsLink45Deg
                  style={{
                    color: "white",
                    position: "relative",
                    width: "2.125rem",
                    height: "2.125rem",
                    left: "20rem",
                    top: "-6rem",
                  }}
                  id={letter.id}
                />
              </div>
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
