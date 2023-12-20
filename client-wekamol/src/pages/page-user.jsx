import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserDataRdx } from "../features/user/asyncActionUser";
import { useEffect } from "react";

export default function MyPage() {
  // let { id } = useParams();
  // let navigate = useNavigate();


  // let token = localStorage.getItem("access_token");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUserDataRdx());
  }, []);

  // console.log(user);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="card bg-black text-slate-200 shadow-lg p-6 w-full sm:w-max border border-green-800">
          <div className="card-body items-center text-center">
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            <hr className="mb-4 w-20 border-b-2 border-green-800 mx-auto" />
            <h3 className="text-lg mb-2"> {user.username}</h3>
            <h3 className="text-lg mb-2">{user.email}</h3>
            <h3 className="text-lg mb-4">Highest Score: {user.highestScore}</h3>
            <div className="card-actions flex justify-end">
              <Link to='/'>
                <button className="btn btn-outline btn-success">Back To Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
