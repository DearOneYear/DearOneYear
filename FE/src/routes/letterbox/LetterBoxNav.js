import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Tap1 = styled.p`
  position: absolute;
  width: 6.75rem;
  height: 1.5rem;
  left: 1.5rem;
  top: 9.125rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;

  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const Tap2 = styled.p`
  position: absolute;
  width: 6.75rem;
  height: 1.5rem;
  left: 9.75rem;
  top: 9.125rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;

  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const LetterBoxNav = () => {
  return (
    <Nav>
      <Link
        to="/letterbox/unread"
        style={{ color: "black", textDecoration: "none" }}
      >
        <Tap1>기다리는 중</Tap1>
      </Link>
      <Link
        to="/letterbox/read"
        style={{ color: "black", textDecoration: "none" }}
      >
        <Tap2>읽은 편지함</Tap2>
      </Link>
    </Nav>
  );
};

export default LetterBoxNav;
