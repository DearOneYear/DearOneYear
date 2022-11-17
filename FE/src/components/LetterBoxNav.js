import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const LetterBoxNav = () => {
  return (
    <Nav>
      <Link to="/letterbox" style={{ color: "black", textDecoration: "none" }}>
        <span>안 읽은 편지</span>
      </Link>
      <Link
        to="/letterbox/read"
        style={{ color: "black", textDecoration: "none" }}
      >
        <span>읽은 편지</span>
      </Link>
    </Nav>
  );
};

export default LetterBoxNav;
