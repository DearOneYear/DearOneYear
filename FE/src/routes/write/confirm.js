import styled, { keyframes } from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
const Title = styled.p`
  position: relative;
  width: 13rem;
  height: 2rem;
  left: 1.5rem;
  top: 5.625rem;

  font-size: 1.5rem;
  line-height: 2rem;

  letter-spacing: 0.02rem;

  color: #ffffff;

  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const Bottle = styled.img`
  position: relative;
  width: 10rem;
  top: 13rem;
`;

const Text1 = styled.p`
  position: relative;
  width: 281px;
  height: 1rem;
  top: 14rem;

  font-size: 1.25rem;
  line-height: 1.75rem;

  text-align: center;

  color: #ffffff;

  text-shadow: 0px 0px 0.031rem rgba(0, 0, 0, 0.25);
`;

const Btn1 = styled.button`
  box-sizing: border-box;

  padding: 1rem 2rem;

  position: relative;
  width: 95vw;
  height: 3.188rem;
  top: 16.5rem;

  color: white;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.5rem -0.0625rem rgba(0, 0, 0, 0.2);
  background-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;
const Button2 = styled.div`
  width: 95vw;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 17.3rem;
`;
const Btn2 = styled.button`
  margin: 0.2rem;
  box-sizing: border-box;

  padding: 1rem 2rem;

  width: 20.5rem;
  height: 3.188rem;

  color: white;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.5rem -0.0625rem rgba(0, 0, 0, 0.2);
  background-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;

function Confirm() {
  const navigate = useNavigate();

  const location = useLocation();
  let selectedDate = location.state.selectedDate.split("-");
  let year = selectedDate[0];
  let month = selectedDate[1];
  let date = selectedDate[2];
  let toname = location.state.toname;
  let toyou = location.state.toyou;
  let email = location.state.email;
  let id = location.state.id;

  //링크 공유하기
  let currUrl = window.document.location.href.split("/");
  let url = currUrl.splice(0, currUrl.length - 2).join("/") + "/detail/" + id;

  const onShareClick = (e) => {
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = url;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("링크가 복사되었습니다.");
  };

  return (
    <Container>
      <Title>나의 내일에게</Title>
      <AiFillHome
        onClick={() => navigate("/")}
        style={{
          color: "white",
          position: "relative",
          width: "2.125rem",
          height: "2.125rem",
          left: "19.3rem",
          top: "2rem",
        }}
      />
      <BsFillPersonFill
        onClick={() =>
          navigate("/mypage", { state: { email: { userEmail: email } } })
        }
        style={{
          color: "white",
          position: "relative",
          width: "2.125rem",
          height: "2.125rem",
          left: "20rem",
          top: "2rem",
        }}
      />
      <center>
        <Bottle src="/img/closedbottle.png" alt="유리병" />
        <Text1>유리병을 바다로 떠나보냈어요.</Text1>
        <Text1>
          {year}년 {month}월 {date}일에
        </Text1>

        {toname !== toyou ? (
          <Text1>{toname}님께 찾아갈게요!</Text1>
        ) : (
          <Text1>당신께 찾아갈게요!</Text1>
        )}

        <Btn1 onClick={onShareClick}>받는 이에게 편지 링크 공유하기</Btn1>
        <Button2>
          <Btn2
            onClick={() =>
              navigate("/letterbox/unread", {
                state: { email: email },
              })
            }
          >
            편지함으로
          </Btn2>
          <Btn2 onClick={() => navigate("/write/write1")}>새로운 편지하기</Btn2>
        </Button2>
      </center>
    </Container>
  );
}

export default Confirm;
