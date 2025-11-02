import { useEffect, useState } from "react";
import './histinf.css';
import monst from "../assets/monst.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import Formulario from "./Formulario";

interface Modulo {
    title: string;
    url?: string;
    link: string;
    background: string;
}

export default function HistInf() {
    const [histInf, setHistInf] = useState<Modulo[]>(() => {
        const savedHistInf = localStorage.getItem('histInf');
        const initialMaterias = savedHistInf ? JSON.parse(savedHistInf) : [
            { title: 'Os 7 Mostrinhos', url: monst, link: 'http://localhost:5173/mostro' },
        ];
        console.log("Esatado inicial das materias:", initialMaterias);
        return initialMaterias;
    });

    const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(location.state && location.state.background){
            console.log("Cor de fundo recebida:", location.state.background);
            document.body.style.backgroundColor = location.state.background;
        }
    }, [location]);

    const excluirItem = (index: number) =>{
        const updatedModulos = histInf.filter((_, i) => i !== index);
        setHistInf(updatedModulos);
        localStorage.setItem("histInf", JSON.stringify(updatedModulos));
        console.log("Item excluido. Novo estado:", updatedModulos);
    };

    const adicionarModulo = (novoModulo: {title: string; url: string; background: string}) =>{
        const title = novoModulo.title.trim();
        const existingModulo = histInf.find((item) => item.title === title);
        if(existingModulo){
            alert("Uma materia com este título ja existe. Escolha outro título");
            return;
        }
        const newModulo: Modulo = {
            ...novoModulo,
            link: `/pagina-criada/${title.replace(/\s+/g, "-").toLowerCase()}`,
        };

        const updatedModulos = [...histInf, newModulo];
        setHistInf(updatedModulos);
        localStorage.setItem("histInf", JSON.stringify(updatedModulos));
        setMostrarFormulario(false);

        console.log("Novo módulo adicionado:", newModulo);
        console.log("Cor de fundo passada:", novoModulo.background);

        navigate(newModulo.link, {state: {background: novoModulo.background}});
    };

    return (
        <>
            <div className="body-histinf">
                <header className="custom-header-histinf">
                    <h1>Contos Infantis</h1>
                </header>
                <div className="container-histinf">
                    {histInf.map((item, index) => (
                        <div key={index} className='image-container-histinf'>
                            <a href={item.link}>
                                <img src={item.url} alt={item.title} width="200px" height="200px" />
                            </a>
                            <h2>{item.title}</h2>
                            <button onClick={() => excluirItem(index)}>Excluir</button>
                        </div>
                    ))}
                    <div className="modulo-adicionar-App">
                        <h2>Adicionar Historia</h2>
                        <div className="button-group-App">
                            <button onClick={() => setMostrarFormulario(true)}>Adicionar Historia</button>
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
}