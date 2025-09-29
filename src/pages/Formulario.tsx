import React, { useState } from "react";
import './Formulario.css'

// Tipando as props do Formulário
type FormularioProps = {
    onSubmit: (novoModulo: { title: string; url: string; background: string }) => void;
    onClose: () => void;
};

const Formulario: React.FC<FormularioProps> = ({ onSubmit, onClose }) => {
    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [background, setBackground] = useState<string>("#ffffff");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title) {
            onSubmit({ title, url, background }); // Passa os dados para o componente principal
            setTitle("");
            setUrl("");
            setBackground("");
        } else {
            alert("Por favor, insira um título para sua página.");
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Imagem: </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div>
                <label>Cor de Fundo: </label>
                <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} />
            </div>
            <div>
                <label>Botao de Excluir: </label>
                <input type="radio" name="excluir"/>
            </div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
        </form>
    );
};

export default Formulario;