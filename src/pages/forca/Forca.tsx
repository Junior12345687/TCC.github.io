import React from 'react';
import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';
import img4 from './img4.png';
import img5 from './img5.png';
import img6 from './img6.png';
import img7 from './img7.png';

// Tipos de props que o componente Forca receberá
interface ForcaProps {
    palavra: string;           // Palavra a ser adivinhada
    letrasCorretas: Set<string>; // Letras que o jogador acertou
    erros: number;             // Número de erros cometidos
}

const Forca: React.FC<ForcaProps> = ({ palavra, letrasCorretas, erros }) => {
    // Função para renderizar as letras da palavra com base nas letras corretas
    const renderizarPalavra = () => {
        return palavra.split('').map((letra, index) => (
            <span key={index} style={{ marginRight: '5px' }}>
                {letrasCorretas.has(letra) ? letra : '_'}
            </span>
        ));
    };

    const imagensForca = [img1, img2, img3, img4, img5, img6, img7];
    
    return (
        <div style={{ width: "50%", display: "flex", justifyContent: "center" }}>
            <div>
                <img src={imagensForca[erros]} alt={`Erro ${erros}`} width={'70%'} height={'90%'} />
            </div>
            <div>{renderizarPalavra()}</div>
        </div>
    );
};

export default Forca;
