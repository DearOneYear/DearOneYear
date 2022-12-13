import new_dummy from "../letterbox/dummy/new_dummy.json";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const url = "/img/beach.png";
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
const Header = styled.div`
  width: 100vw;
`;
const Title = styled.p`
  position: relative;
  left: 4.5rem;
  top: 3rem;
  width: 15rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 28px;

  letter-spacing: 0.02em;

  color: black;
`;
const Text1 = styled.p`
  width: 13.063rem;
  height: 2rem;

  position: relative;
  top: 5rem;

  font-size: 1.5rem;
  line-height: 2rem;

  color: #060606;
`;
const Text2 = styled.p`
  width: 90%;
  height: 2rem;

  position: relative;
  top: 7rem;
  margin: 0rem;

  font-size: 1.25rem;

  color: #060606;
`;
const Text3 = styled.p`
  width: 90%;
  height: 2rem;

  position: relative;
  top: 9rem;

  font-size: 1.25rem;
  line-height: 2rem;

  color: #060606;
`;
const Bottle = styled.img`
  width: 10.438rem;
  height: 13.063rem;

  position: relative;
  top: 10rem;
  filter: drop-shadow(0.25rem 0.25rem 0.625rem rgba(0, 0, 0, 0.15));
  &: hover {
    transform: rotate(30deg);
  }
`;

const LetterOpen = () => {
  const navigate = useNavigate();

  //현재 편지 id 받아오기
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 1]);

  // 이메일로 현재 편지 정보 가져오기
  let [currLetter, setCurrLetter] = useState({});
  const getLetter = async () => {
    await axios
      .get("http://localhost:8000/letter/letter/", {
        headers: { LetterId: `${letterId}` }, // userEmail 앞에서 받은 놈 넣어줍쇼
      })
      .then((res) => {
        setDate(res.data);
        setCurrLetter(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // 날짜 형식 맞춰주기
  const setDate = (currLetter) => {
    let open = currLetter.openAt.split("T")[0].split("-");
    currLetter.openYear = open[0];
    currLetter.openMonth = open[1];
    currLetter.openDate = open[2];

    let send = currLetter.sendAt.split("T")[0].split("-");
    currLetter.sendYear = send[0];
    currLetter.sendMonth = send[1];
    currLetter.sendDate = send[2];
  };

  useEffect(() => {
    getLetter();
  }, []);

  return (
    <Container>
      <Header>
        <Title>편지 읽기</Title>
        <IoIosArrowBack
          onClick={() => navigate(-1)}
          style={{
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "1.5rem",
            top: "0rem",
            color: "black",
          }}
        />
      </Header>
      <center>
        <Text1>편지가 도착했어요!</Text1>
        {currLetter.from_name === currLetter.to_name ? (
          <>
            <Text2>
              {currLetter.sendYear}년 {currLetter.sendMonth}월{" "}
              {currLetter.sendDate}일,
            </Text2>
            <Text2>{currLetter.emotion} 당신이 보낸 유리병이</Text2>
            <Text2>{currLetter.travel_day} 일 동안 세상을 여행하고</Text2>
            <Text2>당신께 돌아왔어요.</Text2>
          </>
        ) : (
          <>
            <Text2>
              {currLetter.sendYear}년 {currLetter.sendMonth}월{" "}
              {currLetter.sendDate}일,
            </Text2>
            <Text2>{currLetter.from_name} 님이 보낸 유리병이 </Text2>
            <Text2>{currLetter.travel_day}일 동안 세상을 여행하고 </Text2>
            <Text2>{currLetter.to_name} 님께 도착했어요.</Text2>
          </>
        )}
        <Text3>유리병을 눌러 편지를 열어볼까요?</Text3>
        <Link to={`/detail/${currLetter.id}/gift`}>
          <Bottle src="/img/closedbottle.png" alt="bottle"></Bottle>
        </Link>
      </center>
    </Container>
  );
};

export default LetterOpen;
