import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 1.5rem;
`;
const Tap1 = styled.p`
  position: relative;
  width: 6.75rem;
  height: 1.5rem;
  left: -2.5rem;
  top: 0.5rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;

  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const Tap2 = styled.p`
  position: relative;
  width: 6.75rem;
  height: 1.5rem;
  left: -4.7rem;
  top: 0.5rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;

  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const Line1 = styled.div`
  position: relative;
  width: 6.75rem;
  height: 0px;
  left: -2.5rem;
  top: -0.25rem;

  border: 0.063rem solid #ffffff;
`;
const Line2 = styled.div`
  position: relative;
  width: 6.75rem;
  height: 0px;
  left: -4.7rem;
  top: -0.25rem;

  border: 0.063rem solid #ffffff;
`;

const LetterBoxNav = () => {
  const currUrl = window.document.location.href;
  const urlArr = currUrl.split("/");
  const thisPage = urlArr[urlArr.length - 1];
  console.log(thisPage);
  return (
    <Nav>
      <Link
        to="/letterbox/unread"
        style={{ color: "black", textDecoration: "none" }}
      >
        <Tap1>기다리는 중</Tap1>
        {thisPage === "unread" ? <Line1></Line1> : <></>}
      </Link>
      <Link
        to="/letterbox/read"
        style={{ color: "black", textDecoration: "none" }}
      >
        <Tap2>읽은 편지함</Tap2>
        {thisPage === "read" ? <Line2></Line2> : <></>}
      </Link>
    </Nav>
  );
};

export default LetterBoxNav;
