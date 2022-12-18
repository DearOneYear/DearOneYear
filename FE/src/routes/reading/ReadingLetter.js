import axios from "axios";
import { useState, useEffect } from "react";

import LetterOpen from "./LetterOpen";
import LetterClose from "./LetterClose";

const ReadingLetter = () => {
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 1]);

  // 백 연결
  let [currLetter, setCurrLetter] = useState({});

  // 이메일로 편지 목록 가져오기
  const getLetter = async () => {
    await axios
      .get("http://localhost:8000/letter/letter/", {
        headers: { LetterId: `${letterId}` }, // userEmail 앞에서 받은 놈 넣어줍쇼
      })
      .then((res) => {
        setCurrLetter(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getLetter();
  }, []);

  return <>{currLetter.dday > 0 ? <LetterClose /> : <LetterOpen />}</>;
};

export default ReadingLetter;
