import React, { useState } from "react";
import bird from "./imagens/bird.png";
import cat from "./imagens/cat.png";
import dog from "./imagens/dog.png";
import birdShadow from "./imagens/birdshadow.png";
import catShadow from "./imagens/catshadow.png";
import dogShadow from "./imagens/dogshadow.png";
import sapo from "./imagens/sapo.jpeg";
import sapoShadow from "./imagens/saposhadow.png";
import './index.css'

interface Animal {
    id: number;
    name: string;
    image: string;
    shadow: string;
}

const animals: Animal[] = [
    { id: 1, name: 'Gato', image: cat, shadow: catShadow },
    { id: 2, name: 'Cachorro', image: dog, shadow: dogShadow },
    { id: 3, name: 'Pássaro', image: bird, shadow: birdShadow },
    { id: 3, name: 'Sapo', image: sapo, shadow: sapoShadow },
    // Adicione mais animais conforme necessário
];

const AnimalShadowGame: React.FC = () => {
    const [matched, setMatched] = useState<number[]>([]);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, shadowId: number): void => {
        event.preventDefault();
        const animalId = Number(event.dataTransfer.getData('animalId'));
        if (animalId === shadowId) {
            setMatched((prevMatched) => [...prevMatched, animalId]);
        }
    };

    const handleDragStart = (event: React.DragEvent<HTMLImageElement>, animalId: number): void => {
        event.dataTransfer.setData('animalId', animalId.toString());
    };

    const resetGame = (): void =>{
        setMatched([]);
    };

    const isCompleted = matched.length === animals.length;

    return (
        <div className="game-container">
            <h1>Quebra-Cabeça de Sombras de Animais</h1>
            {isCompleted && (
                <div className="compleiton-message">
                    <h2>Parabens, voçe acertou todos os animais!</h2>
                    <button onDoubleClick={resetGame} className="reset-button">
                        Jogar Novamente
                    </button>
                </div>
            )}
            <div className="shadows-container">
                {animals.map((animal) => (
                    <div
                        key={animal.id}
                        className="shadow"
                        onDrop={(event) => handleDrop(event, animal.id)}
                        onDragOver={(event) => event.preventDefault()}
                    >
                        <img
                            src={animal.shadow}
                            alt={`Sombra do ${animal.name}`}
                        />
                        {matched.includes(animal.id) && (
                            <img
                                src={animal.image}
                                alt={animal.name}
                                className="matched-image"
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="animals-container">
                {animals.map((animal) => (
                    !matched.includes(animal.id) && (
                        <img
                            key={animal.id}
                            src={animal.image}
                            alt={animal.name}
                            draggable
                            onDragStart={(event) => handleDragStart(event, animal.id)}
                            style={{ opacity: 1 }}
                        />
                    )
                ))}
            </div>
            {!isCompleted && (
                <button onClick={resetGame} className="reset-button">
                    reinicar o jogo
                </button>
            )}
        </div>
    );
};

export default AnimalShadowGame;