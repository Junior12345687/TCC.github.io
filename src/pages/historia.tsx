import { useEffect, useState, type MouseEvent } from 'react';
import './historia.css';

interface Video {
    title: string;
    url: string;
}

export default function Historia() {
    const [materiaHisto, setMateriaHisto] = useState<Video[]>(() => {
        const savedMateriaHisto = localStorage.getItem('materiaHisto');
        return savedMateriaHisto ? JSON.parse(savedMateriaHisto) : [
            { title: 'Pré-Historia - 5 coisas que você deveria saber', url: "https://www.youtube.com/embed/1XPL3hzuYRY" },
            { title: 'Historia do Egito Antigo', url: "https://www.youtube.com/embed/TNmwlPfSRR0" },
            { title: 'Descobrindo O Brasil', url: "https://www.youtube.com/embed/CSIQ8u6x8_o" },
            { title: 'Historia da Grecia', url: "https://www.youtube.com/embed/HJMns0ipipI" },
            { title: 'Historia da Vida', url: "https://www.youtube.com/embed/1XPL3hzuYRY" },
            { title: 'Historia da Vida', url: "https://www.youtube.com/embed/1XPL3hzuYRY" },
            { title: 'Historia da Vida', url: "https://www.youtube.com/embed/1XPL3hzuYRY" },
        ];
    });

    const [newTitle, setNewTitle] = useState('');
    const [newURL, setNewURL] = useState('');

    useEffect(() => {
        localStorage.setItem('materiaHisto', JSON.stringify(materiaHisto));
    }, [materiaHisto]);

    const addNewVideo = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (newTitle && newURL) {
            const newVideoObject: Video = {
                title: newTitle,
                url: newURL,
            };
            setMateriaHisto([...materiaHisto, newVideoObject]);
            setNewTitle('');
            setNewURL('');
        }
    };

    const deleteVideomost = (index: number) => {
        const updatedVideos = materiaHisto.filter((_, i) => i!== index);
        setMateriaHisto(updatedVideos);
    };

    return (
        <>
            <div className='body-video-hist'>
                <header className="custom-header-hist">
                    <h1>Historia</h1>
                </header>
                <div className="container-hist">
                    {materiaHisto.map((item, index) => (
                        <div key={index} className='video-container-hist'>
                            <a href={item.url}>
                                <iframe src={item.url} allowFullScreen title={item.title}></iframe>
                            </a>
                               <h2>{item.title}</h2>               
                            <button onClick={() => deleteVideomost(index)}> Excluir </button>
                        </div>
                    ))}
                    <div className="add-video-hist">
                        <h2>Adicionar Novo Vídeo</h2>
                        <input
                            type="text"
                            placeholder="Título do Vídeo"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="URL EX:(.com/embed/oMBbs5p8TII)"
                            value={newURL}
                            onChange={(e) => setNewURL(e.target.value)}
                        />
                        <button onClick={addNewVideo}>Adicionar Vídeo</button>
                    </div>
                </div>
            </div>
        </>
    );
}