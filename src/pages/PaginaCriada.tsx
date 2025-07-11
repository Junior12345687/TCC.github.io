import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./paginaCriada.css";

interface Video {
    title: string;
    url: string;
}

interface Modulo {
    title: string;
    background: string;
    link: string;
}

const PaginaCriada: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    const location = useLocation();
    const [videos, setVideos] = useState<Video[]>(() => {
        const savedVideos = localStorage.getItem(`videos.${title}`);
        return savedVideos ? JSON.parse(savedVideos) : [];
    });
    const [newTitle, setNewTitle] = useState<string>("");
    const [newVideo, setNewVideo] = useState<string>("");
    const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");

    useEffect(() => {
        // Busca os módulos do localStorage
        const savedModulos: Modulo[] = JSON.parse(localStorage.getItem("modulos") || "[]");
        const modulo = savedModulos.find((mod: Modulo) => mod.title === title);

        // Define a cor de fundo com prioridade para o localStorage, depois location.state, depois padrão
        if (modulo) {
            setBackgroundColor(modulo.background);
        } else if (location.state?.background) {
            setBackgroundColor(location.state.background);
            // Opcional: salva no localStorage para persistência futura
            const newModulos = [...savedModulos, {
                title: title || "",
                background: location.state.background,
                link: ""
            }];
            localStorage.setItem("modulos", JSON.stringify(newModulos));
        }
        // Se não houver nada, mantém o padrão (#ffffff)
    }, [title, location.state]);

    useEffect(() => {
        localStorage.setItem(`videos.${title}`, JSON.stringify(videos));
    }, [videos, title]);

    // useEffect(() => {
    //     const savedModulos: Modulo[] = JSON.parse(localStorage.getItem("modulos") || "[]");
    //     const modulo = savedModulos.find((mod: Modulo) => mod.title !=title);

    //     if (modulo){
    //         setBackgroundColor(modulo.background);
    //     }
    // },[]);

    const addVideo = () => {
        if (newTitle && newVideo) {
            const newVideoObject: Video = { title: newTitle, url: newVideo };
            setVideos([...videos, newVideoObject]);
            setNewTitle("");
            setNewVideo("");
            alert(`Vídeo "${newTitle}" foi adicionado à página: ${title}`);
        }
    };

    return (
        <div className="pagina-criada" style={{ backgroundColor }}>
            <header className="custom-header-pagina-criada">
                <h1>{title}</h1>
            </header>
            <div className="video-container">
                {videos.map((item, index) => (
                    <div key={index} className="video-item">
                        <a href={item.url}>
                            <iframe src={item.url} allowFullScreen title={item.title}></iframe>
                        </a>
                        <h2>{item.title}</h2>
                    </div>
                ))}
                <div className="add-video-form-p">
                    <header className="custom-header-add-video">
                        <h2>Adicionar Novos Videos </h2>
                    </header>
                    <input
                        type="text"
                        placeholder="Título do Vídeo"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="EX:(.com/embed/oMBbs5p8TII)"
                        value={newVideo}
                        onChange={(e) => setNewVideo(e.target.value)}
                    />
                    <button onClick={addVideo}>Adicionar Vídeo</button>
                </div>
            </div>
        </div>
    );
};

export default PaginaCriada;