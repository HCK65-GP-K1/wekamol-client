import { useNavigate } from "react-router-dom";

export default function HomePage() {
  let navigate = useNavigate();

  let token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  const handleToProfile = () => {
    navigate("/my");
  };

  return (
    <>
      <h1>INI HOMEPAGE, ISINYA FORM UNTUK MASUK SESSION GAME????</h1>
      <button className="btn btn-primary">PLAY</button>
      <button className="btn btn-primary" onClick={handleToProfile}>
        PROFILE
      </button>
      <button className="btn btn-error" onClick={handleLogout}>
        LOGOUT
      </button>
    </>
  );
}
