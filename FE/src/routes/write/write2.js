import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h2`
    color: blue;
`

function Write2() {
    const navigate = useNavigate();

    function Navigate() {
        navigate(`/write/write3/toyou`);
    };

    function printText1() {
        const text1 = document.getElementById('toname').value;
        document.getElementById("result1").innerText = text1
    };

    function printText2() {
        const text2 = document.getElementById('toyou').value;
        document.getElementById("result2").innerText = text2
    };

    return (
    <>
    <Title>너에게 편지쓰는 중...(1/5)</Title>
        <label htmlFor="toname">To. </label>
        <input id="toname" type="text" placeholder="받는 사람 이름" maxLength="28" required onKeyUp={printText1}></input>님
        <br></br>
        <label htmlFor="toyou">From. </label>
        <input id="toyou" type="text" placeholder="내 이름" maxLength="28" required onKeyUp={printText2}></input>님
        <p>나중에 편지 도착을 알려드려요! <br></br>ex "<span id="result1" ></span>"님에게 "<span id="result2"></span>"님이 보낸 편지가 도착했어요</p>
    <button onClick={Navigate}>다음으로</button>

    {/* {pageIdx ===6 && <Write1></Write1>} */}
    </>
    );
};

export default Write2 ;