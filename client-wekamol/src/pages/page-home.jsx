import { useNavigate } from "react-router-dom";

export default function HomePage() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  const handleToProfile = () => {
    navigate("/my");
  };
  const handleToGame = () => {
    navigate("/game");
  };

  return (
    <>
      <div className="relative" style={{
        backgroundImage: `url('https://i.pinimg.com/236x/1e/89/44/1e89447eea5bb7ff361c003efaec1a50.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="flex flex-row items-center justify-center h-screen md-30">
          <button className="btn mr-4" onClick={handleToGame}>PLAY GAME</button>
          <button className="btn" onClick={handleToProfile}>
            PROFILE USER
          </button>
          <button className="btn btn-error absolute top-0 right-0 mt-4 mr-4" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
}
