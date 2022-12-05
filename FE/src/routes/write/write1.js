import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Write1() {
  const navigate = useNavigate();
  const [who, setWho] = useState("");
  function Who(e) {
    if (e.target.id === "tome") {
      setWho("tome");
      navigate(`/write/write3/tome`, {
        state: { toname: "me", toyou: "me" },
      });
    } else if (e.target.id === "toyou") {
      setWho("toyou");
      navigate(`/write/write2`);
    }
  }

  return (
    <>
      <h3>누구에게 편지할 건가요?</h3>
      <div>
        <button type="button" id="tome" onClick={Who}>
          나에게
        </button>
        <button type="button" id="toyou" onClick={Who}>
          너에게
        </button>
      </div>
    </>
  );
}

export default Write1;
