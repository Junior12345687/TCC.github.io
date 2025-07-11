import React, { useState }  from "react";
import Blocos from "./components/Blocos";
import "./memory.css"


export default function Memory(){

    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
    }
    return(
        <div className="container-memory">
            <h1 className="titulo">Memory Game</h1>

            {!gameStarted ? (
                <div className="start-section">
                    <button className="start-button" onClick={startGame}>
                        Iniciar Jogo
                    </button>
                </div>
            ):(
                <div className="baseDojo">
                    <Blocos />
                </div>
            )}
        </div>
    );
}