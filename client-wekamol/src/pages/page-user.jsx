import { useLocation, useParams } from "react-router-dom";

export default function MyPage() {
  let params = useParams();
  let location = useLocation();

  return (
    <>
      <h1>INI MY PAGE, ISINYA PROFILE USER, NAMPILIN DATA DATA USER BESERTA HIGHEST SCORE, URL PAKE PARAMS ID</h1>
    </>
  );
}
