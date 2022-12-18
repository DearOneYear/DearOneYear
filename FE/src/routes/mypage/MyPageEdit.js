import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const url = "/img/background.png";

const MyPageEdit = () => {
  const location = useLocation();
  const currName = location.state.name;
  const email = location.state.email;
  const currBirthMonth = location.state.month;
  const currBirthDate = location.state.day;

  const [name, setName] = useState(currName);
  const [birthday, setBirthday] = useState(
    `2022-${currBirthMonth}-${currBirthDate}`
  );

  const onChange = (e) => {
    if (e.target.id === "name") {
      setName(e.target.value);
    }
    if (e.target.id === "birthday") {
      setBirthday(e.target.value);
    }
  };

  const navigate = useNavigate();
  const saveChange = () => {
    const config = {
      headers: { Email: `Bearer ${email}` }, // email
    };
    const data = {
      name: name,
      birthday: birthday,
    };
    correct(data, config);

    navigate("/mypage", {
      state: {
        email: email,
      },
    });
  };

  const correct = async (data, config) => {
    await axios
      .post("http://localhost:8000/accounts/mypage/", data, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.request.status);
        if (err.request.status === 400) {
          alert("잘못된 정보를 입력하셨습니다.");
        }
        if (err.request.status === 404) {
          alert("사용자를 찾을 수 없습니다.");
        }
      });
  };
  return (
    <CenterWrapper>
    <MainWrapper>
      <DivTop>
        <DivArrowButton>
          <IoIosArrowBack onClick={() => navigate("/")} style={{ width: "4vh", height: "4vh", color: "white"}}/>  {/* 여기 버튼 누르면 뒤로 가게 해야하는데 어떻게 하나요..? 일단 홈으로 돌아가게 붙여놨음 */}
        </DivArrowButton>
        <PTitle>개인정보 수정</PTitle>
      </DivTop>
      <DivUnder>
        <DivMid>
          <DivInfo>
            <label htmlFor="name">이름&nbsp;&nbsp;&nbsp;</label>
            <Input id="name" type="text" value={name} onChange={onChange} />
          </DivInfo>
          <DivInfo>
            <p>계정&nbsp;&nbsp;&nbsp;{email}</p>
          </DivInfo>
          <DivInfo>
            <label htmlFor="birthday">생일&nbsp;&nbsp;&nbsp;</label>
            <Input type="date" id="birthday" onChange={onChange} value={birthday} />
          </DivInfo>
        </DivMid>
        <ButtonSave onClick={saveChange}>저장하기</ButtonSave>
      </DivUnder>
    </MainWrapper>
    </CenterWrapper>
  );
};

export default MyPageEdit;


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
  background-image: url(${url});
  background-size: cover; 
  background-position: center;
  color: white;
  // background-origin: padding-box;
`;

const DivTop = styled.div`
  width: 100%;
  margin: 1vh 0vh;  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const DivArrowButton = styled.div`
  padding-left: 2.5vh;
`;

const PTitle = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  margin: 3vh 1.5vh;
  text-shadow: 0vh 0.2vh 0.3vh rgba(0, 0, 0, 0.2);
`;

const DivUnder = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DivMid = styled.div`
`;

const DivInfo = styled.div`
  height: 7vh;
`;

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: solid white 0.2vh;
  color: white;
`;

const ButtonSave = styled.button`
  width: 47vh;
  height: 7.5vh;
  border: white;
  border-radius: 1vh;
  font-size: 2.2vh;
  margin-top: 2vh;
`;