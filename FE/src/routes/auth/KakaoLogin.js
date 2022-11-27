import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  // const onClickLogin = async () => {
  //   console.log('ㅋㅋㅇㄺㅇ');
  //    await axios.get('http://localhost:8000/accounts/signin/kakao/')
  //           .then((res) => console.log(res))
  //           .catch(function (error) {
  //               console.log(error);
  //           })
  // }
  const navigate = useNavigate();
  let kakaoUrl = 'http://localhost:8000/accounts/signin/kakao/';
  let kakaoCallbackUrl = 'http://localhost:8000/accounts/signin/kakao/callback/';
  const onClickLogin = () => {
    window.location.href = kakaoUrl;
    // axios.get(kakaoUrl, {
    //   params: {
    //     redirect_uri: "http://localhost:3000/login/"
    //   }
    // })
    //   .then((response) => console.log(response)).catch(function (err) {console.log(err)})


  }
  let currUrl = window.document.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');
  const data = {
    'code': `${code}`
  };
  const config = { "Content-Type": 'application/json' };


  const loginHandler = async () => {
    await axios.post(`${kakaoCallbackUrl}`, data, config).then(res => {
      console.log(res);
      // 쿠키 설정
      setCookie('my_access_token', res.data.my_access_token, 30);
      setCookie('my_refresh_token', res.data.my_refresh_token, 30);
      setCookie('access_token', res.data.access_token, 1);
      navigate('/');

    }).catch(err => console.log(err));
  };

  const setCookie = (key, value, expiredays) => {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = key + '=' + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
  }


  useEffect(() => {
    if (code) {
      loginHandler(code);
    } else {
      console.log('에러');
    }
  },[])

  return (
    <>
        <button onClick={onClickLogin}>카카오로 로그인하기</button>
    </>
  );
};

export default KakaoLogin;