function KakaoLogin() {
    const REST_API_KEY = "489dc458a9a2b77d9583aa0e98ef0f52";
    const REDIRECT_URI = "http://localhost:3000"
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    return <a href={KAKAO_AUTH_URL}>Kakao Login</a>;
  }

  export default KakaoLogin;