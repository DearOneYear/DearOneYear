import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import dummyLetter from "../letterbox/dummy/dummyLetter.json";
import { useEffect, useState } from "react";
import axios from "axios";

const MyPage = () => {
  const name = "토끼";
  // const email = dummyLetter.email;
  const birth_month = dummyLetter.birthMonth;
  const birth_date = dummyLetter.birthDate;

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const location = useLocation();
  const email = location.state.email.userEmail;

  console.log(email);


  // let [accessToken, setAccessToken] = useState("");
  let kakaoToken = '';
  let access_token = '';
  const getCookie = () => {
    let cookie = document.cookie.split(";");
    let cookieArr = [];
    cookie.map((e) => {
      let c = e.split("=");
      cookieArr.push(c);
    });
    console.log(cookieArr);
    // setAccessToken(cookieArr[1][1]);
    let key = [];
    cookieArr.map((e) => {
      key.push(e[0]);
    })
    console.log(key.indexOf(' access_token'));
    let indexAccessToken = key.indexOf(' my_access_token');
    let indexKakaoToken = key.indexOf(' access_token');

    access_token = cookieArr[indexAccessToken][1];
    kakaoToken = cookieArr[indexKakaoToken][1];

    console.log(access_token);
    if (access_token !== '') {
      getUserInfo();
    }
    
    return access_token, kakaoToken;
  };
  const [dbUserInfo, setDbUserInfo] = useState([]);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  // let month = 0;
  // let date = 0;
  const getUserInfo = async () => {
    await axios
      .get("http://localhost:8000/accounts/mypage/", {
        headers: { Email: `Bearer ${email}` }, // userEmail 앞에서 받은 놈 넣어줍쇼
      })
      .then((res) => {
        setDbUserInfo(res.data);
        console.log(res);
        birthbirth(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const birthbirth = (dbUserInfo) => {
    console.log(dbUserInfo);
    let birthday = dbUserInfo.birthday.split("T")[0].split('-');
    console.log(birthday);
    setMonth(birthday[1]);
    setDate(birthday[2]);
    // month = birthday[1];
    // date = birthday[2];

  }
  console.log(dbUserInfo);
  console.log(month);



  // 카카오 로그아웃
  const sendToken = async (kakaoToken) => {
    console.log(kakaoToken);
      try {
                const response = await axios.post('http://localhost:8000/accounts/signout/kakao/', '', {
                    headers: {
                    Kakaoauth: `${kakaoToken}` // Bearer 넣지 말 것! JWT 토큰으로 착각해서 Unauthorized 에러 남.
                    }
                });
        console.log(response);
        deleteCookie(' access_token');
        deleteCookie(' my_access_token');
        deleteCookie(' my_refresh_token');

        navigate('/');
            } catch (error) {
                console.log(error);
            }
        };

  const logout = () => {
    getCookie();
    console.log(kakaoToken);
    sendToken(kakaoToken);

  }

  const setCookie = (key, value, expiredays) => {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = key + '=' + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
  }

  const deleteCookie = (key) => {
    // document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setCookie(key, '', -1);
  }

  useEffect(() => {
    getCookie();
    console.log(access_token);

    // userCheck();
    // console.log(userEmail);
    // getUserInfo();
  }, []);

  return (
    <>
      <h1>마이 페이지</h1>
      <button onClick={handleGoBack}>뒤로 가기</button>
      <button onClick={logout}>로그아웃</button>
      <p>이름 {dbUserInfo.name}</p>
      <p>카카오계정 이메일 {dbUserInfo.email}</p>
      <p>
        생일 {month} 월 {date} 일
      </p>

      <Link to="/mypage/edit">
        <button>프로필 수정하기</button>
      </Link>
      
    </>
  );
};

export default MyPage;
