import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Write3() {

    //Navigator

    
    let currUrl = window.document.location.href;
    let urlArr = currUrl.split('/');
    let who = urlArr[urlArr.length - 1];
    console.log(who);
    const ToWrite4 = useNavigate();
    function Navigate() {
        console.log(who);
        if (who ==='tome'){
            ToWrite4(`/write/write4/tome`);
            console.log('tome write3로 갑시다')
        }
        else if (who === 'toyou'){
            ToWrite4(`/write/write4/toyou`);
            console.log('toyou write3로 갑시다')
        }
    }

    // 1년 후 눌렀을 때 날짜 표시
    const [selectedDate, setChangeText] = useState('');

    function Oneyearlater() {
        let now = new Date();

        let nextYear = now.getFullYear() + 1;
        let todayMonth = now.getMonth() + 1;
        let todayDate = now.getDate();
        let day1 = nextYear + '-' + todayMonth + '-' + todayDate;

        console.log(day1);
        setChangeText(day1);

        console.log("1년 후 눌렀을 때 날짜 표시 완료")
    };
    // 1년 후 눌렀을 떄 날짜 표시 완료

    function input(){
        const calendarDays=document.querySelector("#input_date").value;
        console.log(calendarDays);
        setChangeText(calendarDays);
    }
    // function MyNextBirthday() {
    // 생일을 가지고 오고, 년도를 올해로 바꾼다.
    // 올해 날짜와 비교해서, 그 날짜가 지났으면 년도에 1을 더해서 날짜를 보여준다.
    // 올해 날짜와 비교해서, 그 날짜가 지나지 않았으면 그대로 날짜를 보여준다.


    // }
    return (
    <>
    {who === 'tome' ? <h2>나에게 편지 쓰는 중...(1/4)</h2> :<h2>너에게 편지쓰는 중...(2/5)</h2>}
    {who === 'tome' ? <h3>언제의 나에게 보낼 건가요?</h3> :<h3>언제의 너에게 보낼 건가요?</h3>}
    {/* 버튼 누르면 해당 날짜 보여주고, 값을 전달해줘야해. */}
    <button onClick={Oneyearlater}>1년 후</button> <br></br>
    <button>다음 내 생일</button><br></br>
    <span> 날짜 선택하기 :</span>
    <input type="date" id="input_date" onChange={input}></input><br></br>
    <p>{selectedDate}</p>
    <button onClick={Navigate}>다음으로</button>

    </>
    );
};

export default Write3;