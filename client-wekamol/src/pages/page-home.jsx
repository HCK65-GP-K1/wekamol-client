import { Link, useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataRdx } from "../features/user/asyncActionUser";

export default function HomePage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUserDataRdx());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-screen h-screen justify-center items-center bg-black">
        <div>
          <h1 className="text-5xl md:text-6xl text-slate-200">Welcome, {user.username}!</h1>
        </div>

        <div className="flex gap-6 mt-6">
          <Link to='/game'>
            <button className="btn btn-outline btn-success">Play Game</button>
          </Link>

          <Link to='/my'>
            <button className="btn btn-outline btn-info">My Profile</button>
          </Link>
        </div>

        <div className="mt-6">
          <button onClick={handleLogout} className="btn btn-outline btn-error absolute top-0 right-0 mt-6 mr-6">Logout</button>
        </div>
      </div>
    </>
  );
}
