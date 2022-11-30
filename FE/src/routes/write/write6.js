import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
        return;
    }
    if (onCancel && typeof onCancel !== "function") {
        return;
    }

    const confirmAction = () => {
        if (window.confirm(message)) {
            onConfirm();
        } else {
            onCancel();
        }
    };

    return confirmAction;

};


function Write6() {
    const location = useLocation();
    const toname = location.state.toname;
    const toyou = location.state.toyou;
    const emotion = location.state.emotion;
    const selectedDate = location.state.selectedDate;
    const finalImage = location.state.finalImage;

    console.log(selectedDate);
    const [finalToName, setFinalToName] = useState('');
    const [finalText, setFinalText] = useState('');
    const [finalFromName, setFinalFromName]=useState('');
    let [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();
    

    function FinalToName(e) {
        // const finalToName = document.getElementById('finaltoname').value;
        // const finalToName = e.target.value;
        console.log(e.target.value);
        setFinalToName(e.target.value);
        // console.log(finalToName)
        // setFinalToName(finalToName);
        };
        console.log('확인용', finalToName);

    function FinalText(e) {
        // const finalText = document.getElementById('finaltext').value;
        setFinalText(e.target.value);
        console.log(e.target.value);
        };

    function FinalFromName(e) {
        // const finalFromName = document.getElementById('finalfromname').value;
    
        setFinalFromName(e.target.value);
        console.log(e.target.value);
        };    
    

    let currUrl = window.document.location.href;
    let urlArr = currUrl.split('/');
    let who = urlArr[urlArr.length - 1];
    console.log(who);

    let access_token = '';
      // 쿠키 받기
    const getCookie = () => {
    let cookie = document.cookie.split("; ");
    let cookieArr = [];
    if (cookie.length !== 0) {
      cookie.map((e) => {
        let c = e.split("=");
        cookieArr.push(c);
      });
    }
    
    // 쿠키 속 access_token 받기
    let key = [];
    cookieArr.map((e) => {
        key.push(e[0]);
    });
    console.log(cookieArr);
    if (key.includes("access_token") === true) {
        let indexAccessToken = key.indexOf("my_access_token");
        access_token = cookieArr[indexAccessToken][1];
    }
    };
    // 로그인 상태 체크
  const userCheck = () => {
    let tokenVerifyUrl = "http://localhost:8000/accounts/verify/";
    const getDB = async () => {
      try {
        const response = await axios.get(`${tokenVerifyUrl}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.data.email.length !== 0) {
          console.log("로그인");
          setUserEmail(response.data.email);
          
        } else {
          console.log("login");
          // navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDB();
  };

  useEffect(()=>{
      getCookie();
      userCheck();
  },[]);

  function Navigate() {
      navigate(`/write/confirm1`, {state : {selectedDate : {selectedDate}, toname : {toname}, toyou: {toyou}}});
      console.log('confirm1으로 갑시다')

  };
    const confirmSend = async () => {
        await axios.post('http://localhost:8000/letter/letterbox/', 
        {
            'email':userEmail, 'from_name': toyou, 'to_name': toname, 'image':finalImage, 
            'recipient':finalToName, 'message': finalText, 'sender': finalFromName, 'openAt':selectedDate, 'emotion' : emotion
        } )
        . then((res)=> {
            console.log('편지 쓰기 성공');
            console.log(res);
            Navigate();


        }).catch(function(err){
            console.log(err);
        })
        // console.log("편지를 전송했습니다.")

        
    };
    const cancelConfirm = () => console.log("취소했습니다.");
    const confirmDelete = useConfirm(
    "편지를 보낸 후에는 수정 및 삭제가 불가능합니다.편지를 보내시겠어요?",
    confirmSend,
    cancelConfirm,
);

    return (
        <>
        {who === 'tome' ? <h2>나에게 편지 쓰는 중...(4/4)</h2> :<h2>너에게 편지쓰는 중...(5/5)</h2>}

        <h3>소중한 마음을 담아<br></br>편지를 작성해주세요.</h3>

        <div>
        
        <span>To. </span><input id="finaltoname" type="text" required maxLength="20" onChange={FinalToName}></input><br></br>
        <input type="text" rows="50" cols="100" required maxLength="1000" id="finaltext" onChange={FinalText}></input><br></br>
        <span>From. </span><input type="text" required maxLength="20" id="finalfromname" onChange={FinalFromName}></input>
        </div>
        
        <input type="submit" value="편지 보내기" onClick={confirmDelete}></input>
        
        </>
    );
};

export default Write6;