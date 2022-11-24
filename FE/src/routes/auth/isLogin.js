import React from "react";
import { Route, Navigate } from "react-router-dom";
import Axios from "axios"
    // 쿠키생성
    var setCookie = function(cookieNm, val, exp) {
        var date = new Date();
        date.setDate(date.getDate() + exp);
        document.cookie = cookieNm + '=' + val+ ';expires=' + date.toGMTString() + ';path=/';
    };

    // 쿠키삭제
    var delCookie = function(cookieNm) {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        document.cookie = cookieNm+ "= " + "; expires=" + date.toGMTString();
    };

    // 쿠키가져오기
    var getCookie = function(cookieNm) {
        var cookieValue = document.cookie.match('(^|;) ?' + cookieNm + '=([^;]*)(;|$)'); 
        return unescape(cookieValue);
    };

const isLogin = () => {

  let access_token = getCookie("my_access_token");
  Axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  //백 주소로 요청 보내기
  // Axios.get('', access_token).then(res => )
  //   return !!localStorage.getItem("access_token");
  };
  
export default isLogin;

//쿠키-