import React from 'react';
import { useNavigate } from "react-router-dom";



function Login() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
      };
    const REST_API_KEY = "489dc458a9a2b77d9583aa0e98ef0f52";
    const REDIRECT_URI = "http://localhost:3000";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <div>
            <div>
                <button onClick={handleGoBack}>뒤로가기</button>
            </div>
            <div>
                <h1>로그인/ 회원가입</h1>
            </div>
            <div>
                {/* <a href={KAKAO_AUTH_URL}>
                    <button>카카오 로그인</button>
                </a> */}
            </div>
        </div>

    );
    
}

export default Login;