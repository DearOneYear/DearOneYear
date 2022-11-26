import React from "react";
import { Route, Navigate } from "react-router-dom";
import Axios from "axios"
import { useState } from "react";
    // 쿠키생성
    // var setCookie = function(cookieNm, val, exp) {
    //     var date = new Date();
    //     date.setDate(date.getDate() + exp);
    //     document.cookie = cookieNm + '=' + val+ ';expires=' + date.toGMTString() + ';path=/';
    // };

    // // 쿠키삭제
    // var delCookie = function(cookieNm) {
    //     var date = new Date();
    //     date.setDate(date.getDate() - 1);
    //     document.cookie = cookieNm+ "= " + "; expires=" + date.toGMTString();
    // };

    // // 쿠키가져오기
    // var getCookie = function(cookieNm) {
    //     var cookieValue = document.cookie.match('(^|;) ?' + cookieNm + '=([^;]*)(;|$)'); 
    //     return unescape(cookieValue);
    // };

const IsLogin = () => {
    let [accessToken, setAccessToken] = useState('');

    let cookie = document.cookie.split(';');
    let cookieArr = [];
      cookie.map((e) => {
        let c = e.split('=');
        cookieArr.push(c);
      });
      setAccessToken(cookieArr[2][1]);
    
    let logincheck;
    // if (accessToken값이 있으면){
    //     logincheck = true; 
//         또는
            //PublicRoute();
    // } else {
    //     logincheck = false;
    //         또는
    //      PrivateRoute();
    // }
    return logincheck;

    //바로 되는게 안되면 

//   let access_token = getCookie("my_access_token");
//   Axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  //백 주소로 요청 보내기
  // Axios.get('', access_token).then(res => )
    // return !!localStorage.getItem("access_token");
  
//accesstoken이 없으면 NULL
      
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


