import { type MouseEvent, useEffect, useState } from 'react';
import "./ingles.css";

interface Video {
    title: string;
    url: string;
}

export default function Ingles() {
    const [materiaIngles, setMateriaIngles] = useState<Video[]>(() => {
        const savedMateriaIngles = localStorage.getItem('materiaIngles');
        return savedMateriaIngles ? JSON.parse(savedMateriaIngles) : [
            { title: 'Animals in English', url: 'https://www.youtube.com/embed/4w7cS9CL9QE' },
            { title: 'Geometric Shapes With Animals', url: 'https://www.youtube.com/embed/AJeitT6lSVM' },
            { title: 'Geometric Shapes With Animals', url: 'https://www.youtube.com/embed/AJeitT6lSVM' },
            { title: 'Geometric Shapes With Animals', url: 'https://www.youtube.com/embed/AJeitT6lSVM' },
            { title: 'Geometric Shapes With Animals', url: 'https://www.youtube.com/embed/AJeitT6lSVM' },
            { title: 'Geometric Shapes With Animals', url: 'https://www.youtube.com/embed/AJeitT6lSVM' },
            { title: 'Geometric Shapes With Animals', url: 'https://www.youtube.com/embed/AJeitT6lSVM' },
            // Outros vídeos...
        ];
    });

    const [newTitleIngles, setNewTitleIngles] = useState('');
    const [newURLIngles, setNewURLIngles] = useState('');

    useEffect(() => {
        localStorage.setItem('materiaIngles', JSON.stringify(materiaIngles));
    }, [materiaIngles]);

    const addVideoIngles = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (newTitleIngles && newURLIngles) {
            const newVideoObject: Video = {
                title: newTitleIngles,
                url: newURLIngles
            };
            setMateriaIngles([...materiaIngles, newVideoObject]);
            setNewTitleIngles('');
            setNewURLIngles('');
        }
    };

    const deleteVideoIngles = (index: number) => {
        const updatedVideos = materiaIngles.filter((_, i) => i !== index);
        setMateriaIngles(updatedVideos);
    };

    return (
        <div className="body-video-ingles">
            <header className="custom-header-ingles">
                <h1>English Classes</h1>
            </header>
            <div className="container-ingles">
                {materiaIngles.map((item, index) => (
                    <div key={index} className="video-container-ingles">
                        <a href={item.url}>
                            <iframe src={item.url} allowFullScreen title={item.title} width="200px" height="200px"></iframe>
                        </a>
                        <h2>{item.title}</h2>
                        <button onClick={() => deleteVideoIngles(index)}>Excluir</button>
                    </div>
                ))}
                <div className="add-video-ingles">
                    <h2>Adicionar Novo Vídeo</h2>
                    <input
                        type="text"
                        placeholder="Título do Vídeo"
                        value={newTitleIngles}
                        onChange={(e) => setNewTitleIngles(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="URL do Vídeo EX:(.com/embed/oMBbs5p8TII)"
                        value={newURLIngles}
                        onChange={(e) => setNewURLIngles(e.target.value)}
                    />
                    <button onClick={addVideoIngles}>Adicionar Vídeo</button>
                </div>
            </div>
        </div>
    );
}