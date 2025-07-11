import React, { useEffect, useState } from "react";
import './DV.css'
import ingles from "../assets/ingles.jpeg"
import historia from "../assets/historia.jpeg"
import matematica from "../assets/matematica.jpeg"
import music from "../assets/music.jpeg"
import { useLocation, useNavigate } from "react-router-dom";
import Formulario from "./Formulario";

interface Modulo{
    title: string;
    url: string;
    link: string;
    background: string;
}

export default function DV(){
    const [materia, setMateria] = useState <Modulo[]>(() => {
        const savedMaterias = localStorage.getItem('materias');
        const initialMaterias = savedMaterias ? JSON.parse(savedMaterias) : [
            {title: 'Ingles', url: ingles, link: 'http://localhost:5173/ingles'},
            {title: 'Historia', url: historia, link: 'http://localhost:5173/historia'},
            {title: 'Matematica', url: matematica, link: 'http://localhost:5173/matematica'},
            {title: 'Musica', url: music, link: 'http://localhost:5173/musicas'},
            {title: 'Outras Materias', url: 'https://www.youtube.com/watch?v=RBGwtfEwZEo'},
            {title: 'Outras Materias', url: 'https://www.youtube.com/watch?v=RBGwtfEwZEo'},
        ];
        console.log("Estado inicial das materias", initialMaterias);
        return initialMaterias;
    });

    const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() =>{
        if(location.state && location.state.background){
            console.log("Cor de fundo recebida:", location.state.background);
            document.body.style.backgroundColor = location.state.background;
        }
    }, [location]);

    const excluirItem = (index: number) => {
        const updatedModulos = materia.filter((_, i) => i !== index);
        setMateria(updatedModulos);
        localStorage.setItem("materias", JSON.stringify(updatedModulos));
        console.log("Item excluído. Novo estado:", updatedModulos);
    };

    const adicionarModulo = (novoModulo: { title: string; url: string; background: string }) => {
        const title = novoModulo.title.trim();
        const existingModulo = materia.find((item) => item.title === title);
        if (existingModulo) {
            alert("Uma materia com este título já existe. Escolha outro título.");
            return;
        }
        const newModulo: Modulo = {
            ...novoModulo,
            link: `/pagina-criada/${title.replace(/\s+/g, "-").toLowerCase()}`,
        };

        const updatedModulos = [...materia, newModulo];
        setMateria(updatedModulos);
        localStorage.setItem("materias", JSON.stringify(updatedModulos));
        setMostrarFormulario(false);

        console.log("Novo módulo adicionado:", newModulo);
        console.log("Cor de fundo passada:", novoModulo.background);

        navigate(newModulo.link, { state: { background: novoModulo.background } });
    };

    return(
        <>
            <div className="body-mat-dv">
                <header className="custom-header-dv">
                    <h1>Pagina de Inclusão</h1>
                </header>
                <div className="container-mat-dv">
                    {materia.map((item, index) => (
                        <div key={item.title} className="image-container-dv">
                            <a href={item.link}>
                                <img src={item.url} alt={item.title} width="200px" height="200px"/>
                            </a>
                            <h2>{item.title}</h2>
                            <button onClick={() => excluirItem(index)}>Excluir</button>
                        </div>
                    ))}
                    <div className="modulo-adicionar-App">
                        <h2>Adicionar Mateira</h2>
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