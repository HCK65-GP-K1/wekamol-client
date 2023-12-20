import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchUserDataRdx } from "../features/user/asyncActionUser";
import { useEffect } from "react";

export default function MyPage() {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();


  let token = localStorage.getItem("access_token");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUserDataRdx());
  }, []);

  // console.log(user);

  return (
    <>
      <h1>
        INI MY PAGE, ISINYA PROFILE USER, NAMPILIN DATA DATA USER BESERTA
        HIGHEST SCORE, URL PAKE PARAMS ID
        KENAPA LOG BERKALI KALI????
      </h1>
    </>
  );
}
