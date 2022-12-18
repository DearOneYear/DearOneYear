import { useNavigate , useLocation} from "react-router-dom";
import styled from "styled-components";

function Write5() {


    const location = useLocation();
    const selectedDate = location.state.selectedDate;
    const toname = location.state.toname;
    const toyou = location.state.toyou;
    const emotion = location.state.emotion;

    console.log(selectedDate);
    let finalImage;
    function setThumbnail(event) {
        var reader = new FileReader();

        reader.onload = function(event) {
        var img = document.createElement("img");
        img.setAttribute("src", event.target.result);
        document.querySelector("div#image_container").appendChild(img);
        }
        console.log(event.target.files[0])
        finalImage = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
    }
    
    let currUrl = window.document.location.href;
    let urlArr = currUrl.split('/');
    let who = urlArr[urlArr.length - 1];
    console.log(who);
    const ToWrite6 = useNavigate();
    function Navigate() {
        console.log(who);
        if (who ==='tome'){
            ToWrite6(`/write/write6/tome`, {state : {selectedDate : selectedDate, toname : toname, toyou: toyou, emotion :emotion, finalImage: finalImage}});
            console.log('tome write6로 갑시다')
        }
        else if (who === 'toyou') {
            
            ToWrite6(`/write/write6/toyou`, {state : {selectedDate : selectedDate, toname : toname, toyou: toyou, emotion :emotion, finalImage:finalImage}});
            console.log('toyou write6로 갑시다')
        }
    }
    return (
    <CenterWrapper>
    <MainWrapper>
        <DivTop>
            {who === 'tome' ? <PTitle>나에게 편지 쓰는 중...(3/4)</PTitle> :<PTitle>너에게 편지쓰는 중...(4/5)</PTitle>}
        </DivTop>
        <DivMid>
        <PComment>n일 후 받을 편지에서 추억할 사진을 첨부해 주세요.</PComment>
            <div>
                <input type="file" name='profile_img' onChange={setThumbnail} accept='image/*' required></input>
                <div id="image_container"></div>
                <input type="submit" value="편지 내용 쓰기" onClick={Navigate}></input>
            </div>
        </DivMid>

    </MainWrapper>
    </CenterWrapper>
    )
};
export default Write5;

const CenterWrapper = styled.div`
  width: 100vw;  
  height: 100vh;
  display: grid;
  justify-content: center;
  background-color: black;
`;

const MainWrapper = styled.div`
  width: 53vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url("img/background.png");
  background-size: cover; 
  background-position: center;
  color: white;
`;


const DivTop = styled.div`
  width: 100%;
  margin: 1vh 0vh;  
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PTitle = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  margin: 3vh 1.5vh;
`;

const DivMid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PComment = styled.p`
`;