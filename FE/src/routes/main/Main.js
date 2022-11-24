import React from 'react';
import {Navigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dummyLetter from "../letterbox/dummy/dummyLetter.json";



function Main() {
    const REST_API_KEY = "489dc458a9a2b77d9583aa0e98ef0f52";
    const REDIRECT_URI = "http://localhost:3000";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    


    return (
        <div>
            <div>
                <h1>나의 내일에게</h1>
                <a href={KAKAO_AUTH_URL}>
                <button>카카오로 시작하기</button>
                </a>
            </div>
            <div>
                <p>내일의 당신에게 편지하세요</p>
                <h1>나의 내일에게</h1>
                <a href={KAKAO_AUTH_URL}>
                <button>로그인</button>
                </a>
            </div>
            <div>
                <p>유리병을 눌러 익명의 편지를 읽어보세요</p>
                <img onClick=""></img>
            </div>
            <div>
                <Link to="/mypage">
                    <button>편지하러 가기</button>
                    //편지쓰기가 없어서 일단은 마이페이지 링크
                </Link>
            </div>
        </div>
    );
};

export default Main;

//퍼블릭/프라이빗으로 나눠서 구현하려는데 ROUTER.JS에 프라이빗 넣어봤더니 메인페이지도 안 뜬다
//백 봐도 잘 모르겠음... 내일 질문