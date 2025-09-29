import React, { useState } from "react";
import InfoPanel from "./InfoPainel"; // Corrigi o nome do arquivo para InfoPanel
import GridBoard from "./gridData"; // Corrigi o nome do arquivo para GridBoard
import Controls from "./Controls";
import './styles.css';

const Blink = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const moveCharacter = (direction: string) => {
        const newPosition = { ...position };
        switch (direction) {
            case 'left':
                newPosition.x = Math.max(0, newPosition.x - 1); // Movimento para a esquerda (diminui x)
                break;
            case 'right':
                newPosition.x = Math.min(9, newPosition.x + 1); // Movimento para a direita (aumenta x)
                break;
            case 'up':
                newPosition.y = Math.max(0, newPosition.y - 1); // Movimento para cima (diminui y)
                break;
            case 'down':
                newPosition.y = Math.min(9, newPosition.y + 1); // Movimento para baixo (aumenta y)
                break;
            default:
                break;
        }
        setPosition(newPosition);
    };

    const resetGame = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div className="blink-game">
            <InfoPanel />
            <GridBoard position={position} />
            <Controls moveCharacter={moveCharacter} resetGame={resetGame} />
        </div>
    );
};

export default Blink;