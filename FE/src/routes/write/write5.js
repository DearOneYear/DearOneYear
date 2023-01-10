import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

function Write5() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state.selectedDate;
  const emotion = location.state.emotion;

  // let finalImage;
  const [finalImage, setFinalImage] = useState("");
  const setThumbnail = (e) => {
    let reader = new FileReader();

    reader.onload = function (e) {
      let img = document.createElement("img");
      img.setAttribute("src", e.target.result);
      document.querySelector("div#image_container").appendChild(img);
    };
    // finalImage =
    setFinalImage(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    setNextBtn("");
  };

  // 다음 버튼
  const [nextBtn, setNextBtn] = useState("disabled");

  return (
    <CenterWrapper>
      <MainWrapper>
        <DivTop>
          <PTitle>나에게 편지 쓰는 중...(3/4)</PTitle>
        </DivTop>
        <DivMid>
          <PComment>추억할 사진을 첨부해 주세요.</PComment>
          <div>
            <input
              type="file"
              name="profile_img"
              onChange={setThumbnail}
              accept="image/*"
              required
            ></input>
            <div id="image_container"></div>
            <input
              type="submit"
              value="편지 내용 쓰기"
              disabled={nextBtn}
              onClick={() =>
                navigate("/write/4", {
                  state: {
                    selectedDate: selectedDate,
                    emotion: emotion,
                    finalImage: finalImage,
                  },
                })
              }
            ></input>
          </div>
        </DivMid>
      </MainWrapper>
    </CenterWrapper>
  );
}
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

const PComment = styled.p``;
