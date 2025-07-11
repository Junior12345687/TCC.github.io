// App.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import editor1 from "./assets/editor1.png";
import historia from "./assets/historia.jpg";
import imag1 from "./assets/imag1.jpeg";
import img2 from "./assets/img2.png";
import Formulario from "./pages/Formulario";


// Definindo tipos
type Modulo = {
    title: string;
    url: string;
    link: string;
    background: string;
    excluirItem: boolean;
};

function App() {
    const [modulo, setModulo] = useState<Modulo[]>(() => {
        const savedModulos = localStorage.getItem("modulos");
        return savedModulos ? JSON.parse(savedModulos) : [
            { title: "Matérias", url: imag1, link: "/Materias", background: "#" , excluirItem: true},
            { title: "Jogos", url: img2, link: "/Games", background: "#", excluirItem: true },
            { title: "Histórias Infantis", url: historia, link: "/HistInf", background: "#", excluirItem: true},
            { title: "Aula para Deficientes Visuais", url: imag1, link: "/DV", background: "#", excluirItem: true },
            { title: "Aula para Deficientes Aditivos", url: imag1, link: "/DA", background: "#", excluirItem: true },
            { title: "VideoPlayer", url: editor1, link: "/VideoPlayer", background: "#" , excluirItem: true },
        ];
    });

    const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
    const navigate = useNavigate();

    const excluirItem = (index: number) => {
        const updatedModulos = modulo.filter((_, i) => i !== index);
        setModulo(updatedModulos);
        localStorage.setItem("modulos", JSON.stringify(updatedModulos));
    };

    const adicionarModulo = (novoModulo: { title: string; url: string; background: string }) => {
        const title = novoModulo.title.trim();
        const existingModulo = modulo.find((item) => item.title === title);
        if (existingModulo) {
            alert("Um módulo com este título já existe. Escolha outro título.");
            return;
        }
    
        const newModulo: Modulo = {
            ...novoModulo,
            link: `/materia-criada/${title.replace(/\s+/g, "-").toLowerCase()}`,
            excluirItem: false
        };
    
        const updatedModulos = [...modulo, newModulo];
        setModulo(updatedModulos);
        localStorage.setItem("modulos", JSON.stringify(updatedModulos));
        setMostrarFormulario(false); // Fechar o formulário após adicionar
        navigate(newModulo.link); // Navegar para a nova página
    };

    const addItem = () => {
        const title = `Novo Módulo ${modulo.length + 1}`;
        const newItem: Modulo = {
            title: title,
            url: img2,
            link: `/pagina-criada/${title.replace(/\s+/g, "-").toLowerCase()}`, // Criando link dinâmico
            background: "#add8e6",
            excluirItem: false
        };

        const updatedModulos = [...modulo, newItem];
        setModulo(updatedModulos);
        localStorage.setItem("modulos", JSON.stringify(updatedModulos));
        navigate(newItem.link); // Navegar para a nova página
    };

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await axios.get("http://localhost:3000/materias");
                console.log("Materias carregadas:", response.data);
            } catch (error) {
                console.error("Erro ao carregar materias:", error);
            }
        };
        fetchMaterias();
    }, []);

    return (
        <div className="body-App">
            <header className="custom-header-App">
                <h1>Aulas Infantis</h1>
            </header>
            <div className="container-App">
                {modulo.map((item, index) => (
                    <div
                        key={item.title}
                        className="image-container-App"
                    >
                        <a href={item.link}>
                            <img
                                src={item.url}
                                alt={item.title}
                                width="200" height="200" />
                        </a>
                        <h2>{item.title}</h2>
                        { item.excluirItem === false ? <button onClick={() => excluirItem(index)}>Excluir</button> : ''}
                    </div>
                ))}
                <div className="modulo-adicionar-App">
                    <h2>Adicionar Novo Módulo</h2>
                    <div className="button-group-App">
                        <button onClick={() => setMostrarFormulario(true)}>Adicionar Módulo</button>
                        {/* <button onClick={addItem}>Adicionar Item Rápido</button> */}
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
    );
}

export default App;