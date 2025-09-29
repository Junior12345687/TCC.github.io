import React from "react";

interface TecladoProps {
    onLetraClicada: (letra: string) => void;
}

const Teclado: React.FC<TecladoProps> = ({ onLetraClicada }) => {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    return (
        <div className="teclado-container">
            {letras.map((letra) => (
                <button key={letra} onClick={() => onLetraClicada(letra)}>
                    {letra}
                </button>
            ))}
        </div>
    );
};
export default Teclado;