import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import hole from "../assets/hole.jpg";
import mole from "../assets/mole-popup.png";
import { errorHandler } from "../helpers/errorHandler";
import Axios from "../helpers/axios";

export default function GamePage() {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  let token = localStorage.getItem("access_token");

  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(5); // default 60 detik!!!
  const [gameActive, setGameActive] = useState(true);

  const gameDuration = 5; //def 60 detik!!

  // const isMole = () => {};
  function showMole(idx) {
    if (!gameActive) return;

    setMoles((currMoles) => {
      const newMoles = [...currMoles];
      newMoles[idx] = true;
      return newMoles;
    });
  }

  function hideMole(idx) {
    if (!gameActive) return;

    setMoles((currMoles) => {
      // if (!moles[idx]) return currMoles;
      const newMoles = [...currMoles];
      newMoles[idx] = false;
      return newMoles;
    });
  }
  function hitMole(idx) {
    // console.log(e.target.id);
    if (!gameActive) return;
    if (!moles[idx]) return;
    hideMole(idx);
    setScore((score) => score + 1);
  }

  async function gameOver() {
    try {
      if (gameActive) {
        setGameActive(false);
        const response = await Axios({
          url: "/users/resultGame",
          method: "POST",
          data: { score: score },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response, "????????????????????");
        await Swal.fire({
          title: "Game Over!",
          text: `congrats, your score is ${score}`,
          icon: "success",
        });
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      showMole(randomIndex);
      setTimeout(() => {
        hideMole(randomIndex);
      }, 750);
    }, 1000);

    const gameTimer = setTimeout(() => {
      clearInterval(interval);
      gameOver();
    }, gameDuration * 1000);

    const timer = setTimeout(() => {
      setRemainingTime((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          gameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(gameTimer);
      clearInterval(timer);
    };
  }, [moles]);

  const handleExitGame = () => {
    navigate("/");
  };

  //setelah game over, panggil axios untuk post data game ke dalam server

  return (
    <>
      <section className="flex justify-center flex-col border h-screen p-4 place-items-center">
        <h1 id="room-game-title" className="absolute top-4">
          BASEGAME ROOM XX
        </h1>
        <h2 className="absolute top-10">
          Score : {score}
          <span className="countdown">
            Time Remaining :
            <span style={{ "--value": remainingTime }}>{remainingTime}</span>
          </span>
        </h2>

        <div
          id="board"
          className="border w-[420px] h-[420px] grid grid-cols-3 grid-rows-3"
        >
          {moles.map((isMole, idx) => {
            return (
              <div id={idx + 1} key={idx}>
                <img
                  src={isMole ? mole : hole}
                  alt="hole"
                  id={idx + 1}
                  onClick={() => {
                    hitMole(idx);
                  }}
                  draggable={false}
                  className="select-none"
                />
              </div>
            );
          })}
        </div>
        {gameActive ? (
          ""
        ) : (
          <div id="nav">
            <button className="btn btn-primary" onClick={handleExitGame}>
              EXIT GAME
            </button>
          </div>
        )}
      </section>
    </>
  );
}
