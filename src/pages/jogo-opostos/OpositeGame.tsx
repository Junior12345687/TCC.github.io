import React, { useEffect, useState } from 'react';
import dia from "./images/dia.png";
import night from "./images/night.png";
import cardback from './images/cardback.png';
import menino from './images/menino.jpeg';
import menina from './images/menina.jpeg';
import seco from './images/seco.png';
import molhado from './images/molhado.png';
import frente from './images/frente.png';
import costas from './images/costa.png';
import './Oposto.css';

type Card = {
    id: number;
    image: string;
    matched: boolean;
    flipped: boolean;
    pairId: number; // Identificador do par (duas cartas do mesmo par terão o mesmo pairId)
};

const OppositeGame = () => {
    // Defina mais pares de opostos para um jogo interessante
    const cardPairs = [
        { id: 1, image1: dia, image2: night },
        { id: 2, image1: menino, image2: menina },
        { id: 3, image1: seco, image2: molhado},
        { id: 4, image1: frente, image2: costas},
    ];

    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState<number>(0);
    const [gameCompleted, setGameCompleted] = useState<boolean>(false);

    const initializeGame = () => {
        let gameCards: Card[] = [];
        
        cardPairs.forEach((pair) => {
            // Adiciona as duas cartas do par
            gameCards.push({
                id: pair.id * 2, // ID único para a primeira carta do par
                image: pair.image1,
                matched: false,
                flipped: false,
                pairId: pair.id // Mesmo pairId para ambas as cartas do par
            });
            
            gameCards.push({
                id: pair.id * 2 + 1, // ID único para a segunda carta do par
                image: pair.image2,
                matched: false,
                flipped: false,
                pairId: pair.id // Mesmo pairId para ambas as cartas do par
            });
        });
        
        gameCards = gameCards.sort(() => Math.random() - 0.5);
        setCards(gameCards);
        setFlippedCards([]);
        setMoves(0);
        setGameCompleted(false);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        if(cards.length > 0 && cards.every(card => card.matched)){
            setGameCompleted(true);
        }
    }, [cards]);

    const handleCardClick = (id: number) => {
        const clickedCard = cards.find(card => card.id === id);
        
        if(!clickedCard || clickedCard.flipped || clickedCard.matched || flippedCards.length >= 2){
            return;
        }

        const newCards = cards.map(card =>
            card.id === id ? {...card, flipped: true} : card
        );
        setCards(newCards);

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        if(newFlippedCards.length === 2){
            setMoves(moves + 1);

            const [firstId, secondId] = newFlippedCards;
            const firstCard = cards.find(card => card.id === firstId);
            const secondCard = cards.find(card => card.id === secondId);

            if(firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
                setTimeout(() => {
                    setCards(cards.map(card =>
                        card.id === firstId || card.id === secondId
                            ? {...card, matched: true}
                            : card
                    ));
                    setFlippedCards([]);
                }, 500);
            } else {
                setTimeout(() => {
                    setCards(cards.map(card =>
                        card.id === firstId || card.id === secondId
                            ? {...card, flipped: false}
                            : card
                    ));
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div className='Opostgame-container'>
            <header>
                <h1>Combine os Opostos</h1>
                <p>Combine pares de Cartas opostas!</p>
            </header>

            <div className='Opostgame-info'>
                <p>Movimentos: {moves}</p>
                <button onClick={initializeGame}>Reiniciar Jogo</button>
            </div>

            {gameCompleted ? (
                <div className='Opostgame-complete'>
                    <h2>Parabéns! Você completou o jogo em {moves} movimentos!</h2>
                    <button onClick={initializeGame}>Jogar Novamente</button>
                </div>
            ) : (
                <div className='cards-grid'>
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
                            onClick={() => handleCardClick(card.id)}
                        >
                            <div className='card-inner'>
                                <div className='card-front'>
                                    <img src={card.image} alt="Carta" />
                                </div>
                                <div className='card-back'>
                                    <img src={cardback} alt="Verso da carta" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OppositeGame;