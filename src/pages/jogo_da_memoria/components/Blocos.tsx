import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";

// Importação das imagens
import img1 from "../assets/img1.gif";
import img2 from "../assets/img2.gif";
import img3 from "../assets/img3.gif";
import img4 from "../assets/img4.gif";
import img5 from "../assets/img5.gif";
import img6 from "../assets/img6.gif";
import img7 from "../assets/img7.gif";
import img8 from "../assets/img8.gif";
import img9 from "../assets/img9.gif";
import giphy from "../assets/giphy.gif";
import cardback from "../assets/cardback.png";

interface CardItem {
    id: number;
    img: string;
    stat: string;
    nome: number;
    showImage: boolean;
    isMatched: boolean;
}

const allImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

function MemoryGame() {
  // Estados do jogo
    const [items, setItems] = useState<CardItem[]>([]);
    const [currentPhase, setCurrentPhase] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [correctClicks, setCorrectClicks] = useState(0);
    const [incorrectClicks, setIncorrectClicks] = useState(0);
    const [timer, setTimer] = useState(40);
    const [levelImages, setLevelImages] = useState<string[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    // Configurações de tempo
    const initialTime = 3000;
    const timePerPhase = Math.max(initialTime * Math.pow(0.8, currentPhase - 1), 1000);

  // Gera itens aleatórios para o jogo
    const generateItems = useCallback(() => {
        const selectedImages = getRandomImages(3);
        setLevelImages(selectedImages);
        
        const duplicatedImages = [...selectedImages, ...selectedImages, ...selectedImages];
        const shuffledImages = shuffleArray(duplicatedImages);
        
        const newItems = shuffledImages.map((img, index) => ({
        id: index,
        img,
        stat: "",
        nome: index % 9 + 1,
        showImage: true,
        isMatched: false,
        }));
    
        setItems(newItems);
        setFlippedCards([]);
    }, []);

  // Função auxiliar para embaralhar array
    const shuffleArray = (array: any[]) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

  // Seleciona imagens aleatórias
    const getRandomImages = (count: number) => {
        return shuffleArray(allImages).slice(0, count);
    };

  // Inicializa o jogo
    useEffect(() => {
        generateItems();
    }, [currentPhase, generateItems]);

  // Contador regressivo
    useEffect(() => {
        if (gameOver) return;

        const countdown = setInterval(() => {
        setTimer(prev => {
            if (prev <= 1) {
            setGameOver(true);
            return 0;
            }
            return prev - 1;
        });
        }, 1000);

        return () => clearInterval(countdown);
    }, [gameOver]);

  // Esconde cartas após intervalo
    useEffect(() => {
        if (gameOver || items.length === 0) return;

        const intervalId = setInterval(() => {
        if (items.every(item => item.isMatched)) {
            setGameOver(true);
            return;
        }

        setItems(prevItems => 
            prevItems.map(item => ({
            ...item,
            showImage: item.isMatched ? true : false
            }))
        );
        setFlippedCards([]);
        }, timePerPhase);

        return () => clearInterval(intervalId);
    }, [items, timePerPhase, gameOver]);

    // Verifica se o item selecionado está correto
    const checkCorrectItem = useCallback((index: number) => {
        const currentImage = items[index].img;

        if (levelImages.includes(currentImage)) {
        setCorrectClicks(prev => prev + 1);
        setItems(prevItems =>
            prevItems.map(item =>
            item.id === index ? { ...item, isMatched: true, showImage: true } : item
            )
        );

        if (correctClicks + 1 >= levelImages.length) {
            setTimeout(handleNextLevel, 1000);
        }
        } else {
        setIncorrectClicks(prev => prev + 1);
        }
    }, [items, levelImages, correctClicks]);

    // Manipula a seleção de cartas
    const handleSelection = useCallback((index: number) => {
        if (isProcessing || items[index].isMatched || flippedCards.includes(index)) {
        return;
        }

        setIsProcessing(true);
        setItems(prevItems =>
        prevItems.map(item =>
            item.id === index ? { ...item, showImage: true } : item
        )
        );
        setFlippedCards(prev => [...prev, index]);

        setTimeout(() => {
        checkCorrectItem(index);
        setIsProcessing(false);
        }, 300);
    }, [isProcessing, items, flippedCards, checkCorrectItem]);

  // Avança para o próximo nível
    const handleNextLevel = useCallback(() => {
        setCurrentPhase(prev => prev + 1);
        setCorrectClicks(0);
        setTimer(40);
        setGameOver(false);
    }, []);

  // Reinicia o jogo
    const restartGame = useCallback(() => {
        setCurrentPhase(1);
        setCorrectClicks(0);
        setIncorrectClicks(0);
        setTimer(40);
        setGameOver(false);
        generateItems();
    }, [generateItems]);

  // Conteúdo do jogo
    const gameContent = gameOver ? (
        <div className="game-over-container">
        <img src={giphy} className="congratulations-gif" alt="Parabéns" />
        <h1>Parabéns! Você completou a fase {currentPhase}!</h1>
        <button onClick={restartGame} className="game-button">
            {currentPhase > 1 ? "Jogar Novamente" : "Próxima Fase"}
        </button>
        </div>
    ) : (
        <>
        <div className="game-header">
            <div className="timer">⏱️ Tempo: {timer}s</div>
            <div className="incorrect-clicks">❌ Erros: {incorrectClicks}</div>
            <div className="phase">Fase: {currentPhase}</div>
        </div>

        <div className="search-images">
            <h2>Encontre estes GIFs:</h2>
            <div className="target-images">
            {levelImages.map((img, index) => (
                <img key={index} src={img} alt={`Alvo ${index}`} className="target-image" />
            ))}
            </div>
        </div>

        <div className="game-grid">
            {items.map((item, index) => (
            <div
                key={`${item.id}-${currentPhase}`}
                className={`game-card ${item.isMatched ? "matched" : ""} ${item.showImage ? "flipped" : ""}`}
                onClick={() => handleSelection(index)}
            >
                <div className="card-inner">
                <div className="card-front">
                    <img src={item.img} alt="GIF" className="card-image" />
                </div>
                <div className="card-back">
                    <img src={cardback} alt="Verso" className="card-back-image" />
                </div>
                </div>
            </div>
            ))}
        </div>
        </>
    );

return (
<div className="memory-game">
    <h1 className="game-title">Memória de GIFs</h1>
    {gameContent}
</div>
);
}

export default MemoryGame;