import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import hole from "../assets/hole.jpg";
import mole from "../assets/mole-popup.png";
import { errorHandler } from "../helpers/errorHandler";
import Axios from "../helpers/axios";
import { socket } from "../utils/socket";
import LoadingAnimation from "../skeleton";

export default function GamePage() {
  let { room } = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  let token = localStorage.getItem("access_token");
  let id = socket.id;

  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(15); // default 60 detik!!!
  const [gameActive, setGameActive] = useState(true);

  const [loading, setLoading] = useState(true);

  const handleOnRoomReady = (payload) => {
    if (payload.playerList.length > 1) {
      setLoading(false);
    }
    // console.log(payload, "PAYLOAD PLAYERLIST USER");
  };

  useEffect(() => {
    socket.emit("join-room", room, handleOnRoomReady);
    socket.on("playerList", handleOnRoomReady);
  }, [room]);

  const gameDuration = 15; //def 60 detik!!

  // const isMole = () => {};
  function showMole(idx) {
    if (!gameActive) return;
    // console.log(gameActive)

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
        socket.emit('score', {score})
        // console.log(response, "????????????????????");
        await Swal.fire({
          title: "Game Over!",
          text: `Congrats, your score is ${score}`,
          icon: "success",
        });
      }
      socket.emit("gameover", {
        room,
        id,
        score,
      });

      // socket.on("gameResult", ({ result, score }) => {
      //   Swal.fire({
      //     title: `Game Over!`,
      //     text: `You are ${result}. Your score is ${score}.`,
      //     icon: result === "Winner" ? "success" : "info",
      //   });
      // });
    } catch (error) {
      errorHandler(error);
    }
  }

  useEffect(() => {
    if (!loading) {
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
    }
  }, [moles, loading]);


  const handleExitGame = () => {
    navigate("/");
  };

  // console.log(loading, "LOADING DARI CLIENT");
  // console.log(socket.id, "ID DARI CLIENT");

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <section className="flex justify-center flex-col h-screen w-screen p-4 place-items-center bg-black">
            <h1 id="room-game-title" className="text-4xl text-slate-200 mb-4">
              Room {room}
            </h1>
            <div className="flex gap-6 text-center items-center justify-center mb-4">

            <h2 className="mb-4 text-4xl text-slate-200">
              Score : {score} |
            </h2>
              <h2 className="-ml-4 mb-4 text-4xl text-slate-200">
                Time Remaining : 
                <span className="ml-3 mb-4 text-4xl text-slate-200" style={{ "--value": remainingTime }}>
                  {remainingTime}
                </span>
              </h2>
            </div>

            <div
              id="board"
              className=" rounded-xl w-2/3 h-2/3 lg:w-[640px] lg:h-[640px] grid grid-cols-3 grid-rows-3"
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
              <div id="mt-6">
                <button className="btn btn-outline btn-success mt-8" onClick={handleExitGame}>
                  Exit Room
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
