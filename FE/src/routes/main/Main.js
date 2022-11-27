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
    // let [accessToken, setAccessToken] = useState("");
    // let [isLoggedIn, setIsLoggedIn] = useState(false);
    // let [userEmail, setUserEmail] = useState('');
    let isLoggedIn = false;

    const navigate = useNavigate();

      let access_token = '';

    const getCookie = () => {
        let cookie = document.cookie.split(";");
        let cookieArr = [];
        if (cookie.length !== 0) {
            cookie.map((e) => {
                let c = e.split("=");
                cookieArr.push(c);
            });
            // setAccessToken(cookieArr[2][1]);
        }
        console.log(cookieArr);

        console.log(cookieArr);
        let key = [];
        cookieArr.map((e) => {
            key.push(e[0]);
        })
        console.log(key.indexOf(' access_token'));
        if (key.indexOf(' access_token') === -1) {
            // navigate('/login');
        } else {
            let indexAccessToken = key.indexOf(' my_access_token');
            access_token = cookieArr[indexAccessToken][1];

        }
    // let indexKakaoToken = key.indexOf(' access_token');

    // access_token = cookieArr[indexAccessToken][1];
    // kakaoToken = cookieArr[indexKakaoToken][1];

    // console.log(access_token);

        // accessToken = cookieArr[1][1];
        // console.log(key.includes(' my_access_token'));
        // { key.includes(' my_access_token') ? isLoggedIn = true : navigate('/login') }
        // console.log(isLoggedIn);


        
    };

    // let userEmail = '';
    let [userEmail, setUserEmail] = useState('');
    // 편지함 갈 때 유저 인증
    const userCheck = () => {
        console.log(access_token);
        let tokenVerifyUrl = 'http://localhost:8000/accounts/verify/';
        const getDB = async () => {
            try {
                const response = await axios.get(`${tokenVerifyUrl}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                
                if (response.data.email.length !== 0) {
                    console.log('로그인상태');
                    // response.data.email;
                    // console.log(userEmail);
                    // return userEmail;
                    setUserEmail(response.data.email)
                    // navigate('/letterbox/unread', { state : {email : {userEmail}}});
                } else {
                    console.log('login');
                    navigate('/login');
                    // kakaoLogin();
                }
            } catch (error) {
                console.log(error);
                // navigate('/login');
            }
        };
        getDB();
    };

    // 카카오 로그인 백 뷰 이동
    const kakaoLogin = async () => {
        await axios.get('http://localhost:8000/accounts/signin/kakao/')
            .then((res) => console.log(res))
            .catch(function (error) {
                console.log(error);
            })
        
    }

    // const userStateCheck = () => {

    // }
    console.log(userEmail);

    const login = () => {
        console.log(access_token);
        if (access_token === '') {
            navigate('/login');
        }
    }
    
    const moveToLetterBox = () => {
        navigate('/letterbox/unread', { state : {email : {userEmail}}});
    }

    const moveToMyPage = () => {
        navigate('/mypage', { state : {email : {userEmail}}});
 
    }

    useEffect(() => {
        getCookie();
        userCheck();
    }, []);


    return (
        <div>
            <div>
                <p>내일의 당신에게 편지하세요</p>
                <h1>나의 내일에게</h1>
                {/* <button onClick={userCheck}>로그인</button> */}
                <p>{isLoggedIn}</p>
                {isLoggedIn === false
                    ? <button onClick={login}>로그인</button>
                    : <button>마이페이지</button>
                }
            </div>
            <div>
                <p>유리병을 눌러 익명의 편지를 읽어보세요</p>
                <button onClick={moveToLetterBox}>편지함</button>
                <button onClick={moveToMyPage}>마이페이지</button>
            </div>
            <div>
                <button>편지하러 가기</button>
            </div>
        </div>
    );
};

export default Main;

//퍼블릭/프라이빗으로 나눠서 구현하려는데 ROUTER.JS에 프라이빗 넣어봤더니 메인페이지도 안 뜬다
//백 봐도 잘 모르겠음... 내일 질문