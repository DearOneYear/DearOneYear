import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate();

    let currUrl = window.document.location.href;
    let urlArr = currUrl.split('/');
    let who = urlArr[urlArr.length - 1];
    console.log(who);

    function Navigate() {
        console.log(who);
        if (who ==='tome'){
            navigate(`/write/write7/tome`);
            console.log('tome write3로 갑시다')
        }
        else if (who === 'toyou'){
            navigate(`/write/write7/toyou`);
            console.log('toyou write3로 갑시다')
        }
    }

    const deleteConfirm = () => console.log("삭제했습니다.");
    const cancelConfirm = () => console.log("취소했습니다.");
    const confirmDelete = useConfirm(
    "편지를 보낸 후에는 수정 및 삭제가 불가능합니다.편지를 보내시겠어요?",
    deleteConfirm,
    cancelConfirm
    
);
    return (
        <>
        {who === 'tome' ? <h2>나에게 편지 쓰는 중...(4/4)</h2> :<h2>너에게 편지쓰는 중...(5/5)</h2>}

        <h3>소중한 마음을 담아<br></br>편지를 작성해주세요.</h3>

        <div>
        
        <span>To. </span><input type="text" required maxLength="20"></input><br></br>
        <textarea type="text" rows="50" cols="100" required maxLength="1000"></textarea><br></br>
        <span>From. </span><input type="text" required maxLength="20"></input>
        </div>
        
        <input type="submit" value="편지 보내기" onClick={confirmDelete}></input>
        
        </>

    );
};

export default Write6;