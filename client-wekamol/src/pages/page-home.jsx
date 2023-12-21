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
        {/* LEADERBOARD START */}
        <div className="flex flex-col w-[720px] rounded-xl">
          <h1 className="text-5xl text-center font-semibold text-slate-200 mb-6">Leaderboard</h1>
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
              <div className="overflow-hidden rounded-lg border border-[#006743]">
                <table className="min-w-full">
                  <thead className="bg-[#006743] border-b border-[#006743] w-full">
                    <tr className="text-black text-lg">
                      <th
                        scope="col"
                        className=" font-medium px-6 py-4 text-left"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className=" font-medium  px-6 py-4 text-left"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className=" font-medium  px-6 py-4 text-left"
                      >
                        Highest Score
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-black border-b text-[#006743] border-[#006743] transition duration-300 ease-in-out hover:bg-[#006743] hover:text-black text-md font-medium">
                      <td className="px-6 py-4 whitespace-nowrap">
                        1
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Mark
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Otto
                      </td>
            
                    </tr>
                    <tr className="bg-black border-b text-[#006743] border-[#006743] transition duration-300 ease-in-out hover:bg-[#006743] hover:text-black text-md font-medium">
                      <td className="px-6 py-4 whitespace-nowrap">
                        2
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Jacob
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Thornton
                      </td>
                      
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* LEADERBOARD END */}

        <div>
          <h1 className="text-5xl md:text-6xl text-slate-200">
            Welcome, {user.username}!
          </h1>
        </div>

        <div className="flex gap-6 mt-6">
          <Link to="/game/1">
            <button className="btn btn-outline btn-success">Join Room 1</button>
          </Link>
          <Link to="/game/2">
            <button className="btn btn-outline btn-success">Join Room 2</button>
          </Link>
          <Link to="/game/3">
            <button className="btn btn-outline btn-success">Join Room 3</button>
          </Link>
        </div>

        <div className="flex gap-6 mt-2">
          <Link to="/my">
            <button className="btn btn-outline btn-info">My Profile</button>
          </Link>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-error absolute top-0 right-0 mt-6 mr-6"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
