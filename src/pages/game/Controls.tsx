import React from 'react';
import './styles.css';
import comando from './assets/comando.jpeg';

// Definindo os tipos das props
interface ControlsProps {
    moveCharacter: (direction: string) => void; // Função que recebe uma string como argumento e não retorna nada
    resetGame: () => void; // Função que não recebe argumentos e não retorna nada
}

const Controls: React.FC<ControlsProps> = ({ moveCharacter, resetGame }) => {
    return (
        <div className="controls">
            <img src={comando} alt='Controles do jogo' />
            <div className='buttons'>
                <button onClick={() => moveCharacter('left')}>←</button>
                <button onClick={() => moveCharacter('up')}>↑</button>
                <button onClick={() => moveCharacter('down')}>↓</button>
                <button onClick={() => moveCharacter('right')}>→</button>
                <button onClick={resetGame}>Novamente</button>
            </div>
        </div>
    );
};

export default Controls;