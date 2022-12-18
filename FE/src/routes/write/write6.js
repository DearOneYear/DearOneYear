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
  const toname = location.state.toname;
  const toyou = location.state.toyou;
  const emotion = location.state.emotion;
  const selectedDate = location.state.selectedDate;
  const finalImage = location.state.finalImage;

  console.log(selectedDate);
  const [finalToName, setFinalToName] = useState("");
  const [finalText, setFinalText] = useState("");
  const [finalFromName, setFinalFromName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  function FinalToName(e) {
    // const finalToName = document.getElementById('finaltoname').value;
    // const finalToName = e.target.value;
    console.log(e.target.value);
    setFinalToName(e.target.value);
    // console.log(finalToName)
    // setFinalToName(finalToName);
  }
  console.log("확인용", finalToName);

  function FinalText(e) {
    // const finalText = document.getElementById('finaltext').value;
    setFinalText(e.target.value);
    console.log(e.target.value);
  }

  function FinalFromName(e) {
    // const finalFromName = document.getElementById('finalfromname').value;

    setFinalFromName(e.target.value);
    console.log(e.target.value);
  }

  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let who = urlArr[urlArr.length - 1];
  console.log(who);

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

  function Navigate() {
    navigate(`/write/confirm`, {
      state: {
        selectedDate: selectedDate,
        toname: toname,
        toyou: toyou,
        email: userEmail,
      },
    });
  }
  const confirmSend = async () => {
    let formData = new FormData();
    if (finalImage) {
      formData.append("file", finalImage);
      for (let value of formData.values()) {
        console.log(value);
      }
    }
    formData.append("email", userEmail);
    formData.append("from_name", toyou);
    formData.append("to_name", toname);
    formData.append("recipient", finalToName);
    formData.append("message", finalText);
    formData.append("sender", finalFromName);
    formData.append("openAt", selectedDate);
    formData.append("emotion", emotion);
    await axios
      .post("http://localhost:8000/letter/letterbox/", formData)
      .then((res) => {
        console.log("편지 쓰기 성공");
        console.log(res.data);
        navigate("/write/confirm", {
          state: {
            selectedDate: selectedDate,
            toname: toname,
            toyou: toyou,
            email: userEmail,
            id: res.data.id,
          },
        });
        // Navigate();
      })
      .catch(function (err) {
        console.log(err);
      });
    // console.log("편지를 전송했습니다.")
  };
  const cancelConfirm = () => console.log("취소했습니다.");
  const confirmDelete = useConfirm(
    "편지를 보낸 후에는 수정 및 삭제가 불가능합니다.편지를 보내시겠어요?",
    confirmSend,
    cancelConfirm
  );

  return (
    <CenterWrapper>
    <MainWrapper>
      <DivTop>
        {who === "tome" ? (
          <PTitle>나에게 편지 쓰는 중...(4/4)</PTitle>
        ) : (
          <PTitle>너에게 편지쓰는 중...(5/5)</PTitle>
        )}
      </DivTop>
      <DivMid>
        <PComment>소중한 마음을 담아<br></br>편지를 작성해주세요.</PComment>
        <div>
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
        </div>

        <InputSend type="submit" value="편지 보내기" onClick={confirmDelete}></InputSend>
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

const PComment = styled.p`
`;


const InputSend = styled.input`
`;