import { Link } from "react-router-dom";

function Suji() {
  return (
    <div>
      <Link to="/mypage">
        <button>마이 페이지</button>
      </Link>
      <Link to="/letterbox">
        <button>편지함</button>
      </Link>
    </div>
  );
}

export default Suji;
