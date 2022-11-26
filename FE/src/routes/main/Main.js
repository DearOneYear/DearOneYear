import React from 'react';
import {Navigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dummyLetter from "../letterbox/dummy/dummyLetter.json";
import axios from 'axios';



function Main() {    
    // 쿠키
    let [accessToken, setAccessToken] = useState("");
    // let [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate();

    const getCookie = () => {
    let cookie = document.cookie.split(";");
    let cookieArr = [];
    cookie.map((e) => {
      let c = e.split("=");
      cookieArr.push(c);
    });
    setAccessToken(cookieArr[2][1]);
  };

    // 편지함 갈 때 유저 인증
    const userCheck = () => { 
        let tokenVerifyUrl = 'http://localhost:8000/accounts/verify/';
        const getDB = async () => {
            try {
                const response = await axios.post(`${tokenVerifyUrl}`, '', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                
                if (response.data.email.length !== 0) {
                    // setUserEmail(response.data.email);
                    let userEmail = response.data.email;
                    console.log(userEmail);

                    // const getLetterBox = async () => {
                    //     // try {
                    //     //     const res = await axios.get('http://localhost:8000/letter/letterbox/',
                    //     //         { headers: { email: `Bearer ${userEmail}` } }
                    //     //     );
                    //     // } catch (error) {
                    //     //     console.log(error);
                    //     // }
                    // }
                    // getLetterBox();
                    navigate('/letterbox/unread', { state : {email : {userEmail}}});
                } else {
                    console.log('login');
                    kakaoLogin();
                }
            } catch (error) {
                console.log(error);
            }
        };
        getDB();
    };

    // 카카오 로그인 백 뷰 이동
    const kakaoLogin = async() => {
        await axios.get('http://localhost:8000/accounts/signin/kakao/')
            .then((res) => console.log(res))
            .catch(function (error) {
                console.log(error);
            })
        
    }

    useEffect(() => {
        getCookie();
    }, []);



    return (
        <div>
            <div>
                <h1>나의 내일에게</h1>
                {/* <a href={KAKAO_AUTH_URL}> */}
                <button onClick={userCheck}>카카오로 시작하기</button>
                {/* </a> */}
            </div>
            <div>
                <p>내일의 당신에게 편지하세요</p>
                <h1>나의 내일에게</h1>

                {/* <a href={KAKAO_AUTH_URL}> */}
                <button>로그인</button>
                {/* </a> */}

            </div>
            <div>
                <p>유리병을 눌러 익명의 편지를 읽어보세요</p>
                {/* <img onClick=""></img> */}
            </div>
            <div>


                    <button>편지하러 가기</button>
                    //편지쓰기가 없어서 일단은 마이페이지 링크
                {/* </Link> */}
            </div>
        </div>
    );
};

export default Main;

//퍼블릭/프라이빗으로 나눠서 구현하려는데 ROUTER.JS에 프라이빗 넣어봤더니 메인페이지도 안 뜬다
//백 봐도 잘 모르겠음... 내일 질문