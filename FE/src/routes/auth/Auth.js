import React from 'react';

const Auth = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    return (
        <div>
            <p>{ code }</p>
        </div>
    );
};
export default Auth;