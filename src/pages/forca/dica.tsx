import React from "react";

interface DicaProps {
    dica: string;
}

const Dica: React.FC<DicaProps> = ({ dica }) => {
    return (
        <div className="dica-container">
            <p>{dica}</p>
        </div>
    );
};

export default Dica;