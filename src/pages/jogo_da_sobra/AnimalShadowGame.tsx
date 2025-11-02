import React, { useState, useEffect } from "react";
import bird from "./imagens/bird.png";
import cat from "./imagens/cat.png";
import dog from "./imagens/dog.png";
import birdShadow from "./imagens/birdshadow.png";
import catShadow from "./imagens/catshadow.png";
import dogShadow from "./imagens/dogshadow.png";
import sapo from "./imagens/sapo.jpeg";
import sapoShadow from "./imagens/saposhadow.png";
import urso from "./imagens/urso.jpeg";
import ursoShadow from "./imagens/ursoshadow.png";
import './index.css'

interface Animal {
    id: number;
    name: string;
    image: string;
    shadow: string;
}

const initialAnimals: Animal[] = [
    { id: 1, name: 'Gato', image: cat, shadow: catShadow },
    { id: 2, name: 'Cachorro', image: dog, shadow: dogShadow },
    { id: 3, name: 'Pássaro', image: bird, shadow: birdShadow },
    { id: 4, name: 'Sapo', image: sapo, shadow: sapoShadow },
    { id: 5, name: 'usro', image: urso, shadow: ursoShadow},
    // Adicione mais animais conforme necessário
];

const AnimalShadowGame: React.FC = () => {
    const [matched, setMatched] = useState<number[]>([]);
    const [shuffledAnimals, setShuffledAnimals] = useState<Animal[]>([]);

    // Embaralha os animais quando o componente é montado
    useEffect(() => {
        shuffleAnimals();
    }, []);

    const shuffleAnimals = () => {
        // Cria uma cópia do array para não modificar o original
        const shuffled = [...initialAnimals];
        // Algoritmo Fisher-Yates para embaralhar
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setShuffledAnimals(shuffled);
    };

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

    const resetGame = (): void => {
        setMatched([]);
        shuffleAnimals(); // Embaralha novamente ao reiniciar
    };

    const isCompleted = matched.length === initialAnimals.length;

    return (
        <div className="Shadowgame-container">
            <h1>Quebra-Cabeça de Sombras de Animais</h1>
            {isCompleted && (
                <div className="completion-message">
                    <h2>Parabéns, você acertou todos os animais!</h2>
                    <button onClick={resetGame} className="reset-button">
                        Jogar Novamente
                    </button>
                </div>
            )}
            <div className="shadows-container">
                {shuffledAnimals.map((animal) => (
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
                {initialAnimals.map((animal) => (
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
                    Reiniciar o Jogo
                </button>
            )}
        </div>
    );
};

export default AnimalShadowGame;