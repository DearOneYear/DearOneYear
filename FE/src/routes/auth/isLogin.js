import React from "react";
import { Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const IsLogin = () => {
  console.log('오키');
    // 쿠키
    let [accessToken, setAccessToken] = useState("");

    const getCookie = () => {
    let cookie = document.cookie.split(";");
    let cookieArr = [];
    cookie.map((e) => {
      let c = e.split("=");
      cookieArr.push(c);
    });
    setAccessToken(cookieArr[2][1]);
  };

    // 유저 인증
    const userCheck = () => {
        const getDB = async () => {
            try {
                const response = await axios.post('http://localhost:8000/accounts/verify/', '', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                    // Authorization: `Bearer ${accessToken}`
                });
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        getDB();
            
      return true;  
        
    };

    // useEffect(() => {
        getCookie();
    // }, []);


};
  
export default IsLogin;



//쿠키 my_access_token 없다 -> 카카오 로그인 주소로 보내기 -> 응답 받은 뒤 메인으로 보냄.


//로그인 되었는지 확인
//쿠키  O ->
//let 변수명 = get cookie 어쩌구 ("my_access_token")
// http://localhost:8000/accounts/verify/ 여기 주소의 Header에 Authorization : Bearer 변수명

//response 의 대답을 확인 


//로그아웃
//백 로그아웃 http://localhost:8000/accounts/signout/kakao/
//response 실패했는지 성공했는지에 따라서 다른 화면 띄워주세요


