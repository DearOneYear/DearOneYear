import React from "react";
import { Route, Link } from "react-router-dom";
import isLogin from "./isLogin";
import {Navigate} from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route
        {...rest}
        render={(props) => {
          !isLogin() &&
            alert("접근 권한이 없습니다. 로그인 후 다시 시도하십시오.");
          return isLogin() ? <Component {...props} /> : <Navigate to="/main/Main" />;
          //메인 주소를 저렇게 쓰는거 맞나 모르겠음
          //여러번 링크? 예시 하나만 필요
        }}
      />
    );
  };
  
  export default PrivateRoute;
