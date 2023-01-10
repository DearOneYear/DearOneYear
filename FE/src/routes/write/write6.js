import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const useConfirm = (message = null, onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirmAction;
};

function Write6() {
  const location = useLocation();
  const emotion = location.state.emotion;
  const selectedDate = location.state.selectedDate;
  const finalImage = location.state.finalImage;

  const [finalToName, setFinalToName] = useState("");
  const [finalText, setFinalText] = useState("");
  const [finalFromName, setFinalFromName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  function FinalToName(e) {
    setFinalToName(e.target.value);
    if (finalToName !== "" && finalFromName !== "" && finalText !== "") {
      setNextBtn("");
    }
  }

  function FinalText(e) {
    setFinalText(e.target.value);
    if (finalToName !== "" && finalFromName !== "" && finalText !== "") {
      setNextBtn("");
    }
  }

  function FinalFromName(e) {
    setFinalFromName(e.target.value);
    if (finalToName !== "" && finalFromName !== "" && finalText !== "") {
      setNextBtn("");
    }
  }

  let access_token = "";
  // 쿠키 받기
  const getCookie = () => {
    let cookie = document.cookie.split("; ");
    let cookieArr = [];
    if (cookie.length !== 0) {
      cookie.map((e) => {
        let c = e.split("=");
        cookieArr.push(c);
      });
    }

    // 쿠키 속 access_token 받기
    let key = [];
    cookieArr.map((e) => {
      key.push(e[0]);
    });
    console.log(cookieArr);
    if (key.includes("access_token") === true) {
      let indexAccessToken = key.indexOf("my_access_token");
      access_token = cookieArr[indexAccessToken][1];
    }
  };
  // 로그인 상태 체크 !!
  const userCheck = () => {
    let tokenVerifyUrl = "http://localhost:8000/accounts/verify/";
    const getDB = async () => {
      try {
        const response = await axios.get(`${tokenVerifyUrl}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.data.email.length !== 0) {
          console.log("로그인");
          setUserEmail(response.data.email);
        } else {
          console.log("login");
          // navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDB();
  };

  useEffect(() => {
    getCookie();
    userCheck();
  }, []);

  const confirmSend = async () => {
    let formData = new FormData();
    if (finalImage) {
      formData.append("file", finalImage);
      for (let value of formData.values()) {
        console.log(value);
      }
    }
    formData.append("email", userEmail);
    formData.append("from_name", finalFromName);
    formData.append("to_name", finalToName);
    formData.append("recipient", finalToName);
    formData.append("message", finalText);
    formData.append("sender", finalFromName);
    formData.append("openAt", selectedDate);
    formData.append("emotion", emotion);
    formData.append("file", finalImage);

    await axios
      .post("http://localhost:8000/letter/letterbox/", formData)
      .then((res) => {
        console.log("편지 쓰기 성공");
        console.log(res.data);
        navigate("/confirm", {
          state: {
            selectedDate: selectedDate,
            email: userEmail,
            id: res.data.id,
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const cancelConfirm = () => console.log("취소했습니다.");
  const confirmDelete = useConfirm(
    "편지를 보낸 후에는 수정 및 삭제가 불가능합니다.편지를 보내시겠어요?",
    confirmSend,
    cancelConfirm
  );

  // 다음 버튼
  const [nextBtn, setNextBtn] = useState("disabled");

  return (
    <CenterWrapper>
      <MainWrapper>
        <DivTop>
          <PTitle>나에게 편지 쓰는 중...(4/4)</PTitle>
        </DivTop>
        <DivMid>
          <PComment>
            소중한 마음을 담아<br></br>편지를 작성해주세요.
          </PComment>

          <span>To. </span>
          <input
            id="finaltoname"
            type="text"
            required
            maxLength="20"
            onChange={FinalToName}
          ></input>
          <br></br>
          <input
            type="text"
            rows="50"
            cols="100"
            required
            maxLength="1000"
            id="finaltext"
            onChange={FinalText}
          ></input>
          <br></br>
          <span>From. </span>
          <input
            type="text"
            required
            maxLength="20"
            id="finalfromname"
            onChange={FinalFromName}
          ></input>

          <br />
          <button disabled={nextBtn} onClick={confirmDelete}>
            편지 보내기
          </button>
        </DivMid>
      </MainWrapper>
    </CenterWrapper>
  );
}

export default Write6;

const CenterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  background-color: black;
`;

const MainWrapper = styled.div`
  width: 53vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url("img/background.png");
  background-size: cover;
  background-position: center;
  color: white;
`;

const DivTop = styled.div`
  width: 100%;
  margin: 1vh 0vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PTitle = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  margin: 3vh 1.5vh;
`;

const DivMid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PComment = styled.p``;

const InputSend = styled.button``;
