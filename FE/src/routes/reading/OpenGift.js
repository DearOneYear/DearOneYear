import { useNavigate, Link } from "react-router-dom";
import dummyLetter from "../letterbox/dummy/dummyLetter.json";
import { useState, useEffect } from "react";
import axios from "axios";

const OpenGift = () => {
  // 뒤로 가기
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 2]);

  // let letters = dummyLetter.letters;
  let currLetter;
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
      .get("http://localhost:8000/letter/postbox/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setDbLetter([...res.data]);
      })
      .catch(function (err) {
        console.log(err);
      });

    dbLetter.map((l) => {
      if (l.id === letterId) {
        currLetter = l;
      }
    });
  };

  useEffect(() => {
    getCookie();
    getLetter();
  }, []);

  // letters.map((l) => {
  //   if (l.id === letterId) {
  //     currLetter = l;
  //     l.isOpend = true;
  //   }
  // });

  return (
    <>
      <h1>편지가 도착했어요</h1>
      <button onClick={handleGoBack}>뒤로 가기</button>
      <br />
      <p>편지와 사진이 들어있네요!</p>
      <p>보고 싶은 걸 눌러주세요.</p>
      <br />
      <br />
      <Link to={`/detail/${currLetter.id}/bottle`}>
        <button>편지</button>
      </Link>
      <Link to={`/detail/${currLetter.id}/photo`}>
        <button>카메라</button>
      </Link>
    </>
  );
};

export default OpenGift;
