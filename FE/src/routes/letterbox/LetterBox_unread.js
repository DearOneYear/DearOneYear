import { Link, useNavigate, useLocation } from "react-router-dom";
import LetterBoxNav from "./LetterBoxNav";
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
  top: 31rem;

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
  top: 34.8rem;
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
  // 백 없이 작업 (더미)
  let unOpenedLetters = [new_dummy];
  unOpenedLetters.map((e) => {
    let open = e.openAt.split("T")[0].split("-");
    e.openYear = open[0];
    e.openMonth = open[1];
    e.openDate = open[2];

    let send = e.sendAt.split("T")[0].split("-");
    e.sendYear = send[0];
    e.sendMonth = send[1];
    e.sendDate = send[2];
  });

  // 백 연결시

  // 1127
  // const location = useLocation();
  // const email = location.state.email.userEmail;

  // console.log(email);

  // let [dbLetter, setDbLetter] = useState([]);
  // let [accessToken, setAccessToken] = useState("");

  // const getCookie = () => {
  //  let cookie = document.cookie.split(";");
  //  let cookieArr = [];
  //  cookie.map((e) => {
  //    let c = e.split("=");
  //    cookieArr.push(c);
  //  });
  //  setAccessToken(cookieArr[2][1]);
  //};

  // const getLetter = async () => {
  //  await axios
  //   .get("http://localhost:8000/letter/letterbox/", {
  //     headers: { Email: `Bearer ${email}` }, // userEmail 앞에서 받은 놈 넣어줍쇼
  //   })
  //    .then((res) => {
  //     setDbLetter([...res.data]);
  //   })
  //   .catch(function (err) {
  //      console.log(err);
  //    });
  //  };
  // let [dbLetter, setDbLetter] = useState([]);
  // let [accessToken, setAccessToken] = useState("");

  // const getCookie = () => {
  //   let cookie = document.cookie.split(";");
  //   let cookieArr = [];
  //   cookie.map((e) => {
  //     let c = e.split("=");
  //     cookieArr.push(c);
  //   });
  //   setAccessToken(cookieArr[2][1]);
  // };

  // const getLetter = async () => {
  //   await axios
  //     .get("http://localhost:8000/letter/postbox/", {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     })
  //     .then((res) => {
  //       setDbLetter([...res.data]);
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // };

  // dbLetter.map((e) => {
  //   let open = e.openAt.split("T")[0].split("-");
  //   e.openYear = open[0];
  //   e.openMonth = open[1];
  //   e.openDate = open[2];

  //   let send = e.sendAt.split("T")[0].split("-");
  //   e.sendYear = send[0];
  //   e.sendMonth = send[1];
  //   e.sendDate = send[2];
  // });

  // useEffect(() => {
  //   getCookie();
  //   getLetter();
  // }, []);

  // let unOpenedLetters = [];
  // dbLetter.map((l) => {
  //   if (l.isOpend !== true) {
  //     unOpenedLetters.push(l);
  //   }
  // });

  //링크 공유하기
  let url = document.location.href.split("/").splice(0, 3).join("/");
  console.log(url);
  const onShareClick = (e) => {
    let shareUrl = url + "/detail/" + e.target.id;
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

  const openLetter = (e) => {
    console.log("클릭됨");
    console.log(e.target.id);
    navigate(`/detail/${e.target.id}`);
  };

  return (
    <>
      <Container>
        <Title>편지함</Title>
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
          onClick={() => navigate("/mypage")}
          style={{
            color: "white",
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "20rem",
            top: "2rem",
          }}
        />
        <LetterBoxNav />

        {unOpenedLetters.map((letter) => (
          <Letter key={letter.id} id={letter.id}>
            <div onClick={openLetter} id={letter.id}>
              {letter.isOpend === true ? (
                <img
                  style={{ width: "10%" }}
                  src="/img/opendbottle.png"
                  alt="open"
                  id={letter.id}
                />
              ) : (
                <ClosedBottle
                  src="/img/closedbottle.png"
                  alt="close"
                  id={letter.id}
                />
              )}

              {letter.to_name !== letter.from_name ? (
                <LetterTitle id={letter.id}>
                  D - {letter.dday} {letter.to_name}에게
                </LetterTitle>
              ) : (
                <LetterTitle id={letter.id}>나에게</LetterTitle>
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

            <LetterPeriod>
              {`${letter.sendYear}.${letter.sendMonth}.${letter.sendDate}.`} →{" "}
              {`${letter.openYear}.${letter.openMonth}.${letter.openDate}.`}
            </LetterPeriod>
          </Letter>
        ))}
        <center>
          <NewLetterTxt>새로운 편지하러 가기</NewLetterTxt>
          <NewLetterBtn></NewLetterBtn>
        </center>
      </Container>
    </>
  );
};

export default LetterBoxUnread;
