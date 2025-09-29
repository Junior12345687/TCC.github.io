import React from "react";
import './styles.css';
import cell from './assets/cell.jpeg';

// Definindo os tipos para os dados do grid e ícones
type CellType = keyof typeof icons;
type GridData = CellType[][];

const gridData: GridData = [
    ['sea', 'sea', 'sea', 'sand', 'sand', 'sand', 'sea', 'sea', 'sea', 'sea'],
    ['sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sea'],
    ['sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sea'],
    ['sea', 'sea', 'sea', 'sand', 'sand', 'sand', 'sea', 'sea', 'sea', 'sea'],
    ['sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sea'],
    ['sea', 'sea', 'sea', 'sand', 'sand', 'sand', 'sea', 'sea', 'sea', 'sea'],
    ['sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sea'],
    ['sea', 'sea', 'sea', 'sand', 'sand', 'sand', 'sea', 'sea', 'sea', 'sea'],
    ['sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sand', 'sea'],
    ['sea', 'sea', 'sea', 'sand', 'sand', 'sand', 'sea', 'sea', 'sea', 'sea'],
];

const icons = {
    sea: '🌊',
    sand: '🏖️',
    castle: '🏰',
    bucket: '🪣',
    beachball: '🏐',
    crab: '🦀',
    starfish: '⭐️',
    flamingo: '🦩', 
    shell: '🐚',
    duck: '🦆',
    girl: '👧',
    boy: '👦',
    robot: '🤖',
    truck: '🚚',
    jellyfish: '🌊'
} as const; // "as const" para garantir que os valores sejam tratados como literais

// Definindo o tipo para a posição do personagem
interface Position {
    x: number;
    y: number;
}

// Definindo as props do componente GridBoard
interface GridBoardProps {
    position: Position;
}

const GridBoard: React.FC<GridBoardProps> = ({ position }) => {
    return (
        <div className="grid-board">
            {gridData.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`grid-cell ${cell}`}>
                            {rowIndex === position.y && cellIndex === position.x ? '👤' : icons[cell]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GridBoard;
