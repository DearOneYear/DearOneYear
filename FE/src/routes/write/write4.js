import {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function Write4() {

    let currUrl = window.document.location.href;
    let urlArr = currUrl.split('/');
    let who = urlArr[urlArr.length - 1];
    console.log(who);

    const location = useLocation();
    const selectedDate = location.state.selectedDate;
    const toname = location.state.toname;
    const toyou = location.state.toyou;
    console.log(selectedDate);
    const ToWrite5 = useNavigate();
    function Navigate() {
        console.log(who);
        if (who ==='tome'){
            ToWrite5(`/write/write5/tome`, {state : {selectedDate : {selectedDate}, toname : {toname}, toyou: {toyou}, emotion :{emotion}}});
            console.log('tome write3로 갑시다')
        }
        else if (who === 'toyou'){
            ToWrite5(`/write/write5/toyou`, {state : {selectedDate : {selectedDate}, toname : {toname}, toyou: {toyou}, emotion :{emotion}}});
            console.log('toyou write3로 갑시다')
        }
    }


    const[emotion, setEmotion]=useState('');

    function ClickEmotion(e) {
        console.log(e.target.innerHTML);
        setEmotion(e.target.innerHTML);
    }
    console.log(emotion);
    return (
    <>
    {who === 'tome' ? <h2>나에게 편지 쓰는 중...(2/4)</h2> :<h2>너에게 편지쓰는 중...(3/5)</h2>}
    <h3>지금, 당신은 어떤 기분인가요?</h3>
    <button onClick={ClickEmotion}>행복을 나누고 싶은</button>
    <button onClick={ClickEmotion}>집에 가고 싶은</button><br></br>
    <button onClick={ClickEmotion}>콧노래가 절로 나오는</button>
    <button onClick={ClickEmotion}>위로가 필요한</button><br></br>
    <button onClick={ClickEmotion}>치킨이 땡기는</button>
    <button onClick={ClickEmotion}>아무것도 하기 싫은</button><br></br>
    <button onClick={ClickEmotion}>두근두근 설레는</button>
    <button onClick={ClickEmotion}>혼자 있고 싶은</button>
    
    <button onClick={Navigate}>다음으로</button>
    </>
    )
}

export default Write4;