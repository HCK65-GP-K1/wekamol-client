import { useLocation, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import hole from "../assets/hole.jpg";
import mole from "../assets/mole-popup.png";

export default function GamePage() {
  let params = useParams();
  let location = useLocation();

  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [score, setScore] = useState(0);

  // const isMole = () => {};
  function showMole(idx) {
    setMoles((currMoles) => {
      const newMoles = [...currMoles];
      newMoles[idx] = true;
      return newMoles;
    });
  }

  function hideMole(idx) {
    setMoles((currMoles) => {
      // if (!moles[idx]) return currMoles;
      const newMoles = [...currMoles];
      newMoles[idx] = false;
      return newMoles;
    });
  }
  function hitMole(idx) {
    // console.log(e.target.id);
    if (!moles[idx]) return;
    hideMole(idx);
    setScore((score) => score + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      showMole(randomIndex);
      setTimeout(() => {
        hideMole(randomIndex);
      }, 750);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  return (
    <>
      <section className="flex justify-center flex-col border h-screen p-4 place-items-center">
        <h1 id="room-game-title" className="absolute top-4">
          BASEGAME, Room XX
        </h1>
        <h2 className="absolute top-10">{score}</h2>
        <div
          id="board"
          className="border w-[480px] h-[480px] grid grid-cols-3 grid-rows-3"
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
                />
              </div>
            );
          })}
        </div>
        <div id="nav">
          <button className="btn btn-primary">EXIT GAME</button>
        </div>

        <div>
          <h1>
            INI GAMEPAGE, DIBEDAIN SAMA URL PARAMS, ISINYA BOARD, DLL TANPA
            NAVBAR, ADA TOMBOL EXIT
          </h1>
        </div>
      </section>
    </>
  );
}
