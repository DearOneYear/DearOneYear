import { useNavigate, Link } from "react-router-dom";
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
const Text1 = styled.p`
  width: 100%;
  height: 2rem;

  position: relative;
  top: 4rem;

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
const Letter = styled.img`
  width: 9rem;
  height: 10.375rem;
  position: relative;
  left: 3.5rem;
  top: 12rem;
  filter: drop-shadow(0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
  &: hover {
    transform: rotate(30deg);
  }
`;

const Camera = styled.img`
  width: 9.75rem;
  height: 8.25rem;
  position: relative;
  left: 6rem;
  top: 12rem;
  filter: drop-shadow(0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
  &: hover {
    transform: rotate(-30deg);
  }
`;

const Bottle = styled.img`
  width: 6.371rem;
  height: 10.064rem;
  position: relative;
  left: -13.886rem;
  top: 28rem;
`;

const OpenGift = () => {
  // navigate
  const navigate = useNavigate();

  //현재 편지 id 받아오기
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 2]);

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
        <Text1>편지와 사진이 들어있네요!</Text1>
        <Text2>편지 혹은 사진을 눌러</Text2>
        <Text2>그때를 추억해 볼까요?</Text2>
      </center>
      <Link to={`/detail/${letterId}/bottle`}>
        <Letter src="/img/letter.png" alt="편지 읽기" />
      </Link>
      <Link to={`/detail/${letterId}/photo`}>
        <Camera src="/img/camera.png" alt="사진 보기" />
      </Link>
      <Bottle src="/img/opendbottle.png" alt="빈 유리병" />
    </Container>
  );
};

export default OpenGift;
