import { useNavigate } from "react-router-dom";
import new_dummy from "../letterbox/dummy/new_dummy.json";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const url = "/img/sand.png";
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
const Frame = styled.div`
  // position: relative;
  // top: 1rem;
  // background-color: white;
  margin: 1rem 2rem 2rem 1rem;
`;
const Photo = styled.img`
  position: relative;
  top: 7rem;
  width: 21.875rem;
  height: 21.875rem;

  border: 2rem solid white;
  box-shadow: 0px 0.25rem 1.5rem -0.063rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.156ren);

  border-radius: 0.625rem;
`;
const NewLetterBtn = styled.button`
  position: relative;
  width: 90vw;
  height: 3.563rem;
  top: 17rem;
  color: white;
  font-size: 1.25rem;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.5rem -0.063rem rgba(0, 0, 0, 0.2);
  background-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;

const OpenPhoto = () => {
  // 뒤로 가기
  const navigate = useNavigate();

  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 2]);

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

    let s = currLetter.image.split("/");
    currLetter.photoName = s[s.length - 1];
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
        <Frame>
          <p>
            {currLetter.sendYear}년 {currLetter.sendMonth}월{" "}
            {currLetter.sendDate}일의 추억
          </p>
          <Photo
            alt="gift_photo"
            src={`http://localhost:8000/letter/uploads/images/${currLetter.photoName}`}
          />
        </Frame>

        {currLetter.from_name === currLetter.to_name ? (
          <NewLetterBtn onClick={() => navigate("/write/write1")}>
            새로운 편지 하러 가기
          </NewLetterBtn>
        ) : (
          <NewLetterBtn onClick={() => navigate("/write/write1")}>
            답 편지 하러 가기
          </NewLetterBtn>
        )}
      </center>
    </Container>
  );
};

export default OpenPhoto;
