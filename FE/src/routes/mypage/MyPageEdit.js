import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      headers: { email: email },
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
    <>
      <h1>마이 페이지</h1>
      <label htmlFor="name">이름</label>
      <input id="name" type="text" value={name} onChange={onChange} />
      <p>카카오계정 이메일 {email}</p>
      <label htmlFor="birthday">생일</label>
      <input type="date" id="birthday" onChange={onChange} value={birthday} />
      <br />
      <br />
      <button onClick={saveChange}>저장하기</button>
    </>
  );
};

export default MyPageEdit;
