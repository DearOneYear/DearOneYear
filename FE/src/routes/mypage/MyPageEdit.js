import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MyPageEdit = () => {
  // 이전 페이지에서 넘겨준 값 가져오기
  const location = useLocation();
  const currName = location.state.name;
  const email = location.state.email;
  const currBirthMonth = 5;
  const currBirthDate = 9;

  const [name, setName] = useState(currName);
  const [birthMonth, setBirthMonth] = useState(currBirthMonth);
  const [birthDate, setBirthDate] = useState(currBirthDate);
  const [maxDate, setMaxDate] = useState(31);

  const thirtyOne = ["1", "3", "5", "7", "8", "10", "12"];
  const thirty = ["4", "6", "9", "11"];

  const onChange = (e) => {
    if (e.target.id === "name") {
      setName(e.target.value);
    }
    if (e.target.id === "birth_month") {
      setBirthMonth(e.target.value);
      if (thirtyOne.includes(e.target.value)) {
        setMaxDate(31);
      } else if (thirty.includes(e.target.value)) {
        setMaxDate(30);
      } else {
        setMaxDate(29);
      }
    }
    if (e.target.id === "birth_date") {
      setBirthDate(e.target.value);
    }
  };

  const navigate = useNavigate();
  const saveChange = () => {
    let m = 0;
    let d = 0;
    birthMonth < 10 ? (m = "0" + birthMonth) : (m = birthMonth);
    birthDate < 10 ? (d = "0" + birthDate) : (m = birthDate);
    let birth = `2023-${m}-${d}`;

    const config = {
      headers: { email: email },
    };
    const data = {
      name: name,
      birthday: birth,
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
        console.log(err);
      });
  };
  return (
    <>
      <h1>마이 페이지</h1>
      <label htmlFor="name">이름</label>
      <input id="name" type="text" value={name} onChange={onChange} />
      <p>카카오계정 이메일 {email}</p>
      <p>생일</p>
      <input
        id="birth_month"
        type="number"
        min="1"
        max="12"
        value={birthMonth}
        onChange={onChange}
      />
      <label htmlFor="birth_month">월</label>
      <input
        id="birth_date"
        type="number"
        min="1"
        max={maxDate}
        value={birthDate}
        onChange={onChange}
      />
      <label htmlFor="birth_date">일</label>

      <br />
      <br />
      {/* <Link to="/mypage"> */}
      <button onClick={saveChange}>저장하기</button>
      {/* </Link> */}
    </>
  );
};

export default MyPageEdit;
