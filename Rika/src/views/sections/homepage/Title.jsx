import { useNavigate } from "react-router-dom";
import LoginButton from "../../../common/LoginButton";

const Title = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <h1 className="text-2xl">Welcome to</h1>
      <h1 className="mb-6 text-6xl font-bold underline decoration-[#00d8ff]">
        RIKA!
      </h1>
      <div className="w-3/12 flex justify-center">
        <LoginButton color="black" label={"Login"} onClick={handleLogin} />
      </div>
    </>
  );
};

export default Title;
