import React, { useState, useEffect } from "react";
import "./styles.css";

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

interface Item {
    id: number;
    img: any;
    stat: string;
    nome: number;
    showImage: boolean;
    isMatched: boolean;
}

function Blocos() {
    const [items, setItems] = useState<Item[]>([]);
    const [initialTime, setInitialTime] = useState(3000); // Tempo inicial
    const [timePerPhase, setTimePerPhase] = useState(initialTime);
    const [currentPhase, setCurrentPhase] = useState(1); // Fase atual
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState(false);
    const [correctClicks, setCorrectClicks] = useState(0);
    const [incorrectClicks, setIncorrectClicks] = useState(0);
    const [timer, setTimer] = useState(40);
    const [levelImages, setLevelImages] = useState<any[]>([]); // Imagens para procurar

    const allImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

    const getRandomImages = (count: number) => {
        const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);
        return shuffledImages.slice(0, count);
    };

    useEffect(() => {
        const generateItems = () => {
            const selectedImages = getRandomImages(3);
            setLevelImages(selectedImages); // Define as imagens que o jogador deve procurar
            const shuffledImages = selectedImages.concat(selectedImages, selectedImages).sort(() => Math.random() - 0.5);
            const newItems = shuffledImages.map((img, index) => ({
                id: index,
                img,
                stat: "",
                nome: index % 9 + 1,
                showImage: true,
                isMatched: false,
            }));
            setItems(newItems);
        };

        generateItems();
    }, [currentPhase]);

    useEffect(() => {
        if (gameOver) return;

        if (timer === 0) {
            setGameOver(true);
            return;
        }

        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer, gameOver]);

    useEffect(() => {
        if (gameOver) return;

        const intervalId = setInterval(() => {
            if (items.every((item) => item.isMatched)) {
                setGameOver(true);
                clearInterval(intervalId);
                return;
            }

            setItems((prevItems) =>
                prevItems.map((item) => ({
                    ...item,
                    showImage: false,
                }))
            );
        }, timePerPhase);

        return () => clearInterval(intervalId);
    }, [items, timePerPhase, gameOver]);

    function checkCorrectItem(index: number) {
        const currentImage = items[index].img;

        if (levelImages.includes(currentImage)) {
            setCorrectClicks((prevClicks) => prevClicks + 1);
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === index ? { ...item, isMatched: true, showImage: true } : item
                )
            );

            if (correctClicks + 1 === levelImages.length) {
                handleNextLevel();
            }
        } else {
            setIncorrectClicks((prevClicks) => prevClicks + 1); // Aumenta os cliques incorretos
        }
    }

    function handleSelection(index: number) {
        if (isProcessing || items[index].isMatched || prevIndex === index) {
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === index ? { ...item, showImage: true } : item
            )
        );
        checkCorrectItem(index);
        setPrevIndex(index);
    }

    function handleNextLevel() {
        setCurrentPhase((prevPhase) => prevPhase + 1);
        setCorrectClicks(0);
        setTimer(40);
        setTimePerPhase(Math.max(initialTime * 0.8 ** currentPhase, 1000)); // Reduz o tempo por fase
        setGameOver(false);
    }

    const gameContent = gameOver ? (
        <div className="container">
            <img src={giphy} className="congratulations-gif" alt="Congratulations" />
            <h1>Parabéns! Você completou o jogo.</h1>
            <button onClick={handleNextLevel}>Jogar Novamente</button>
        </div>
    ) : (
        <>
            <div className="search-images">
                <h2>Procure estas imagens:</h2>
                <div className="image-row">
                    {levelImages.map((img, index) => (
                        <img key={index} src={img} alt={`Imagem ${index}`} className="search-image" />
                    ))}
                </div>
            </div>
            <div className="grid">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`box ${item.isMatched ? "matched" : ""}`}
                        onClick={() => handleSelection(index)}
                    >
                        <img
                            src={item.showImage || item.isMatched ? item.img : ""}
                            alt=""
                            className="image-box"
                        />
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <div className="game">
            <div className="timer">Tempo restante: {timer}s</div>
            <div className="incorrect-clicks">Cliques incorretos: {incorrectClicks}</div>
            {gameContent}
        </div>
    );
}

export default Blocos;

