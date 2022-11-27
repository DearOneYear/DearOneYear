import React from 'react';
import { useNavigate } from "react-router-dom";



function Login() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
      };
    
    
    const KAKAO_AUTH_URL = "http://localhost:8000/accounts/signin/kakao/";

    return (
        <div>
            <div>
                <button onClick={handleGoBack}>뒤로가기</button>
            </div>
            <div>
                <h1>로그인/ 회원가입</h1>
            </div>
            <div>
                <a href={KAKAO_AUTH_URL}>
                    <button>카카오 로그인</button>
                </a>
            </div>
        </div>

    );
    
}

export default Login;