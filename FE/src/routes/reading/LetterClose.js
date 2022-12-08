import new_dummy from "../letterbox/dummy/new_dummy.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { BsLink45Deg } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";

const url = "/img/ocean.png";
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

  color: white;
`;
const Text1 = styled.p`
  width: 13.063rem;
  height: 2rem;

  position: relative;
  top: 2rem;

  font-size: 1.5rem;
  line-height: 2rem;

  color: white;
`;
const Text2 = styled.p`
  width: 90%;
  height: 2rem;

  position: relative;
  top: 4rem;
  margin: 0rem;

  font-size: 1.25rem;

  color: white;
`;
const Text3 = styled.p`
  width: 90%;
  height: 2rem;

  position: relative;
  top: 7rem;

  font-size: 1.25rem;
  line-height: 2rem;
  margin: 0;

  color: white;
`;
const Bottle = styled.img`
  width: 10.438rem;
  height: 13.063rem;

  position: relative;
  top: 10rem;
  filter: drop-shadow(0.25rem 0.25rem 0.625rem rgba(0, 0, 0, 0.15));
`;
const Input = styled.input`
  width: 13rem;
  height: 2.75rem;
  position: relative;
  left: 0;
  top: 13rem;
  background: none;
  border: none;
  color: white;
  border-bottom: 0.1rem solid white;
  margin: 1rem;
`;
const Btn = styled.button`
  padding: 1rem 1rem;
  color: white;

  position: relative;
  width: 8rem;
  height: 3.188rem;
  left: 0rem;
  top: 13rem;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.25rem -0.0625rem rgba(0, 0, 0, 0.2);
  background-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;

const LetterClose = () => {
  const navigate = useNavigate();

  // 현재 페이지 id 가져오기
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

  //링크 공유하기
  let url = document.location.href.split("/");
  url = url.splice(0, url.length - 2).join("/") + "/detail/" + letterId;
  const onShareClick = () => {
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = url;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("링크가 복사되었습니다.");
  };

  useEffect(() => {
    getLetter();
  }, []);

  return (
    <Container>
      <Header>
        <Title>편지 기다리는 중...</Title>
        <IoIosArrowBack
          onClick={() => navigate(-1)}
          style={{
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "1.5rem",
            top: "0rem",
            color: "white",
          }}
        />
      </Header>
      {currLetter.from_name === currLetter.to_name ? (
        <></>
      ) : (
        <BsLink45Deg
          style={{
            color: "white",
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "23rem",
            top: "-2.5rem",
          }}
          onClick={onShareClick}
          id={currLetter.id}
        />
      )}
      <center>
        <Text1>도착까지, D - {currLetter.dday}</Text1>
        {currLetter.from_name === currLetter.to_name ? (
          <>
            <Text2>
              {currLetter.sendYear}년 {currLetter.sendMonth}월{" "}
              {currLetter.sendDate}일에 당신이 보낸 유리병이 아직 세상을
              여행하고 있어요.
            </Text2>
            <Text3>유리병이 도착하면 이메일로 알려드릴게요!</Text3>
            <Bottle src="/img/closedbottle.png" alt="bottle"></Bottle>
          </>
        ) : (
          <>
            <Text2>
              {currLetter.sendYear}년 {currLetter.sendMonth}월{" "}
              {currLetter.sendDate}일,
            </Text2>
            <Text2>{currLetter.sender} 님이</Text2>
            <Text2>{currLetter.recipient} 님께 보낸 유리병이</Text2>
            <Text2>아직 세상을 여행하고 있어요.</Text2>
            <Text3>아래에 이메일을 남겨주시면</Text3>
            <Text3>유리병이 도착할 때 이메일로 알려드릴게요!</Text3>
            <Bottle src="/img/closedbottle.png" alt="bottle"></Bottle>

            <form>
              <Input type="email" placeholder="이메일" />
              <Btn type="submit">남기기</Btn>
            </form>
          </>
        )}
      </center>
    </Container>
  );
};

export default LetterClose;
