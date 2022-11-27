// import dummyLetter from "../letterbox/dummy/dummyLetter.json";
import new_dummy from "../letterbox/dummy/new_dummy.json";

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LetterOpen = () => {
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 1]);

  let currLetter = [new_dummy];
  // let currLetter;

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

  //   dbLetter.map((e) => {
  //     let open = e.openAt.split("T")[0].split("-");
  //     e.openYear = open[0];
  //     e.openMonth = open[1];
  //     e.openDate = open[2];

  //     let send = e.sendAt.split("T")[0].split("-");
  //     e.sendYear = send[0];
  //     e.sendMonth = send[1];
  //     e.sendDate = send[2];
  //   });

  //   dbLetter.map((l) => {
  //     if (l.id === letterId) {
  //       currLetter = l;
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getCookie();
  //   getLetter();
  // }, []);

  // 뒤로 가기
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1>편지가 도착했어요</h1>
      <button onClick={handleGoBack}>뒤로 가기</button>
      {currLetter.from_name === currLetter.to_name ? (
        <>
          <p>
            {currLetter.sendYear}년 {currLetter.sendMonth}월{" "}
            {currLetter.sendDate}일,
          </p>

          <p>
            뭐뭐하고 싶었던 당신이 보낸 유리병이 --- 일 동안 세상을 여행하고
            당신께 돌아왔어요.
          </p>
        </>
      ) : (
        <>
          <p>
            {currLetter.sendYear}년 {currLetter.sendMonth}월{" "}
            {currLetter.sendDate}일,
          </p>
          <p>
            {currLetter.sender} {currLetter.from_name} 님이 보낸 유리병이 ---일
            동안 세상을 여행하고 {currLetter.to_name} 님께 도착했어요.
          </p>
        </>
      )}
      <p>유리병을 눌러 편지를 열어볼까요?</p>

      <Link to={`/detail/${currLetter.id}/gift`}>
        <button>유리병</button>
      </Link>

      <br />
    </>
  );
};

export default LetterOpen;
