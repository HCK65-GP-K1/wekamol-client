import { useLocation, useParams } from "react-router-dom";

export default function GamePage() {
  let params = useParams();
  let location = useLocation();

  return (
    <>
      <h1>INI GAMEPAGE, DIBEDAIN SAMA URL PARAMS, ISINYA BOARD, DLL TANPA NAVBAR, ADA TOMBOL EXIT</h1>
    </>
  );
}