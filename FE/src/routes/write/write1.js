import { useNavigate } from "react-router-dom";
// import * as S from "./style"
import {useState} from "react"
function Write1() {
    // const [huge, setHuge] = useState(false)
    const navigate = useNavigate();
    const [who, setWho]= useState('') ;
    console.log(who);



    function Who(e) {
        if (e.target.id ==='tome'){
            setWho('tome');
            navigate(`/write/write3/tome`);
        }
        else if (e.target.id ==='toyou'){
            setWho('toyou');
            navigate(`/write/write2`)
        }

    };
    

    return (
        // <S.Container onClick={()=>{setHuge(!huge)}}>
        // <S.Title huge={huge}>편지하기</S.Title>
        // {huge && <h3>여깄다</h3>}
        // <h3>누구에게 편지할 건가요?</h3>
        // {huge && <S.Text>이거입니다</S.Text>}
        // <div>
        //     <Link to="/write/write3"><button type="button" >나에게</button></Link>
        //     <Link to="/write/write2"><button type="button" >너에게</button></Link>
        // </div>
        // </S.Container>
        <>
                <h3>누구에게 편지할 건가요?</h3>
        <div>
            {/* <Link to="/write/write3"> */}
                <button type="button" id="tome" onClick={Who}>나에게</button>
                {/* </Link> */}
            {/* <Link to="/write/write2"> */}
                <button type="button" id="toyou" onClick={Who}>너에게</button>
                {/* </Link> */}
        </div>
        </>
    )
};

export default Write1;