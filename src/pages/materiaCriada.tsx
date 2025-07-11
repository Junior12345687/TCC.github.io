import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './materiaCriada.css';
import { useNavigate, useLocation } from "react-router-dom";
import Formulario from "./Formulario";

interface Video {
    title: string;
    url: string;
}

interface Modulo {
    title: string;
    url: string;
    link: string;
    background: string;
    videos: Video[];
}

const MateriaCriadas = () => {
    const [materia, setMateria] = useState<Modulo[]>(() => {
        const savedMateria = localStorage.getItem('materia');
        const initialMateria = savedMateria ? JSON.parse(savedMateria) : [

        ];
        console.log(initialMateria);
        return initialMateria;
    });

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const { title } = useParams<{ title: string }>();
    const [materiaSelecionada, setMateriaSelecionada] = useState<Modulo | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [backgroundColor, setBackgroundColor] = useState<String>(location.state?.background || "#ffffff");

    useEffect(() => {
        const savedModulos : Modulo[] = JSON.parse(localStorage.getItem("modulos") || "[]");
        const modulo = savedModulos.find((mod: Modulo) => mod.title === title);
        if(modulo){
            setBackgroundColor(modulo.background);
        }
    }, [title]);

    const excluirItem = (index: number) => {
        const updatedModulos = materia.filter((_, i) => i !== index);
        setMateria(updatedModulos);
        localStorage.setItem('materia', JSON.stringify(updatedModulos));
        console.log("Item excluído com sucesso", updatedModulos);
    };

    // const handleMateriaSelecionada = (modulo: Modulo) => {
    //     setMateriaSelecionada(modulo);
    //     setMostrarFormulario(true);
    // };
    
    const adicionarModulo = (novoModulo: {title: string, url: string, background: string}) => {
        const title = novoModulo.title.trim();
        const existingModulo = materia.find((item) => item.title === title);
        if(existingModulo){
            console.log("Módulo já existe");
            return;
        };
        const newModulo: Modulo = {
            ...novoModulo,
            link: `/pagina-criada/${title.replace(/\s+/g, "-").toLowerCase()}`,
            videos: []
        };
        const updatedModulos = [...materia, newModulo];
        setMateria(updatedModulos);
        localStorage.setItem('materia', JSON.stringify(updatedModulos));
        setMostrarFormulario(false);
        
        console.log("Novo módulo adicionado:", newModulo);
        console.log("Cor de fundo passada:", novoModulo.background);

        navigate(newModulo.link, { state: { background: novoModulo.background } });
    };

    const handleAdicionarVideo = (videoData: {title: string, url: string, background: string}) => {
        if(!materiaSelecionada) return;

        const newVideo: Video = {
            title: videoData.title,
            url: videoData.url,
        };

        const updatedModulos = materia.map(modulo => {
            if(modulo.title === materiaSelecionada.title){
                return {
                    ...modulo,
                    videos: [...modulo.videos, newVideo]
                };
            };
            return modulo;
        });

        setMateria(updatedModulos);
        localStorage.setItem('materia', JSON.stringify(updatedModulos));
        console.log("Vídeo adicionado com sucesso", newVideo);
    };

    return (
        <>
            <div className="materia-criada" style={{backgroundColor}}>
                <header className="custom-header-materia-criada">
                    <h1>{title}</h1>
                </header>

                <div className="container-materia-criada">
                    {materia.map((item, index) => (
                        <div className="imagem-container-mateira">
                            <a href={item.link}>
                                <img src={item.url} alt={item.title} width="200px" height="200px" />
                            </a>
                            <h2>{item.title}</h2>
                            <button onClick={() => excluirItem(index)}>Excluir</button>
                        </div>
                    ))}

                    <div className="modulo-adicionar-App">
                        <h2>Adicionar Materia</h2>
                        <div className="button-group-App">
                            <button onClick={() => setMostrarFormulario(true)}>Adicionar Materia</button>
                        </div>
                        {mostrarFormulario && (
                            <Formulario
                                onSubmit={adicionarModulo}
                                onClose={() => setMostrarFormulario(false)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
    
};

export default MateriaCriadas;