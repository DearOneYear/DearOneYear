import { useLocation } from "react-router-dom";


function Confirm1() {
    const location = useLocation();
    let selectedDate = location.state.selectedDate.split('-');
    let year = selectedDate[0];
    let month = selectedDate[1];
    let date = selectedDate[2];
    let toname = location.state.toname;
    let toyou = location.state.toyou;
    let email = location.state.email;

    

    return (
        <>
        <h2>나의 내일에게</h2>
        <p>유리병을 바다로 떠나보냈어요.</p>
            <p>{year}년 {month}월 {date}일에</p>

        {toname !== toyou ? <p>{toname}님께 찾아갈게요!</p> : <p>당신께 찾아갈게요!</p>}
        <button>받는 이에게 편지 링크 공유하기</button><br></br>
        <button>편지함으로</button>
        <button>새로운 편지하기</button>
        </>
    );
}

export default Confirm1;