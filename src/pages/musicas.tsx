import { useEffect, useState } from "react"
import './music.css'

interface Video{
    title: string,
    url: string,
}
export default function Musicas(){
    const [materiaMusic, setMateriaMusic] = useState<Video[]>(() =>{
        const savedeMateriaMusic = localStorage.getItem('materiaMusic')
        return savedeMateriaMusic ? JSON.parse(savedeMateriaMusic) : [
            {title: 'Musica Fazendinha', url: 'https://www.youtube.com/embed/iq53aL_oG3U'},
            {title: 'Musica Fazendinha', url: 'https://www.youtube.com/embed/iq53aL_oG3U'},
            {title: 'Musica Fazendinha', url: 'https://www.youtube.com/embed/iq53aL_oG3U'},
            {title: 'Musica Fazendinha', url: 'https://www.youtube.com/embed/iq53aL_oG3U'},
            {title: 'Musica Fazendinha', url: 'https://www.youtube.com/embed/iq53aL_oG3U'},
            {title: 'Musica Fazendinha', url: 'https://www.youtube.com/embed/iq53aL_oG3U'},
            {title: 'Musica Fazendinha', url: 'https://www.youtube.com/embed/iq53aL_oG3U'},
            {title: 'Musica Fazendinha', url: 'https://www.youtube.com/embed/iq53aL_oG3U'},
            {title: 'Musica Fazendinha', url: 'https://www.youtube.com/embed/iq53aL_oG3U'},
        ];
    });

    const [newTitle, setNewTitle] = useState('');
    const [newURL, setNewURL] = useState('');

    useEffect(() => {
        localStorage.setItem('materiaMusic', JSON.stringify(materiaMusic));
    }, [materiaMusic]);

    const addNewVideo = () => {
        if(newTitle && newURL){
            const newVideoObject = {
                title: newTitle,
                url: newURL,
            };
            setMateriaMusic([...materiaMusic, newVideoObject]);
            setNewTitle('');
            setNewURL('');
        }
    };

    const deleteVideomat = (index: number) => {
        const updatedVideos = materiaMusic.filter((_, i) => i!== index);
        setMateriaMusic(updatedVideos);
    };
    return(
        <>
        <div className="body-music">
            <header className="custom-header-music">
                <h1>Musicas</h1>
            </header>
            <div className="container-music">
                {materiaMusic.map((item, index) =>{
                    return (
                        <div key={index} className="video-container-music">
                        <a href={item.url}>
                            <iframe src={item.url} allowFullScreen title={item.title} width="200px" height="200px"></iframe>
                        </a>
                        <h2>{item.title}</h2>
                        <button onClick={() => deleteVideomat(index)}>Excluir</button>
                        </div>
                    )
                })}
                <div className="add-video-form-m">
                <h3>Adiconar Novo video</h3>
                <input
                    type="text"
                    placeholder="Titulo do video"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="URL do video (embed)"
                    value={newURL}
                    onChange={(e) => setNewURL(e.target.value)}
                />
                <button onClick={addNewVideo}>Adionar Video</button>
            </div>
            </div>
        </div>
        </>
    )
}