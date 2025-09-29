import { type MouseEvent, useEffect, useState } from 'react';
import './Mat.css';

interface Video {
    title: string;
    url: string;
}

export default function Matematica() {
    const [materiaMatematica, setMateriaMatematica] = useState<Video[]>(() => {
        const savedMateriaMatematica = localStorage.getItem('materiaMatematica');
        return savedMateriaMatematica ? JSON.parse(savedMateriaMatematica) : [
            {title: 'Os numeros', url: 'https://www.youtube.com/embed/RBGwtfEwZEo'},
            {title: 'Descobrindo A Adição 1 parte', url: 'https://www.youtube.com/embed/5VoXOFosETI'},
            {title: 'Descobrindo A Adição 2 parte', url: 'https://www.youtube.com/embed/gLRCEy6yXxk'},
            {title: 'Soma para Crianças', url: 'https://www.youtube.com/embed/prsJNR0Zbqg'},
            {title: 'Matemática', url: 'https://www.youtube.com/embed/aM1bctVM_K8'},
            {title: 'Matemática', url: 'https://www.youtube.com/embed/aM1bctVM_K8'},
            {title: 'Matemática', url: 'https://www.youtube.com/embed/aM1bctVM_K8'},
            // Outros vídeos...
        ];
    });

    const [newTitleMatematica, setNewTitleMatematica] = useState('');
    const [newURLMatematica, setNewURLMatematica] = useState('');

    useEffect(() => {
        localStorage.setItem('materiaMatematica', JSON.stringify(materiaMatematica));
    }, [materiaMatematica]);

    const addVideoMatematica = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (newTitleMatematica && newURLMatematica) {
            const newVideoObject: Video = {
                title: newTitleMatematica,
                url: newURLMatematica
            };
            setMateriaMatematica([...materiaMatematica, newVideoObject]);
            setNewTitleMatematica('');
            setNewURLMatematica('');
        }
    };

    const deleteVideoMatematica = (index: number) => {
        const updatedVideos = materiaMatematica.filter((_, i) => i !== index);
        setMateriaMatematica(updatedVideos);
    };

    return (
        <div className='body-video-mat'>
            <header className='custom-header-mat'>
                <h1>Matemática</h1>
            </header>
            <div className='container-mat'>
                {materiaMatematica.map((item, index) => (
                    <div key={index} className='video-container-mat'>
                        <a href={item.url}>
                            <iframe src={item.url} allowFullScreen title={item.title} width='200px' height='200px'></iframe>
                        </a>
                        <h2>{item.title}</h2>
                        <button onClick={() => deleteVideoMatematica(index)}>Excluir</button>
                    </div>
                ))}
                <div className='add-video-form-mat'>
                    <h2>Adicionar novo Video</h2>
                    <input
                        type='text'
                        placeholder='Título do Video'
                        value={newTitleMatematica}
                        onChange={(e) => setNewTitleMatematica(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="URL do Video EX:(.com/embed/oMBbs5p8TII)"
                        value={newURLMatematica}
                        onChange={(e) => setNewURLMatematica(e.target.value)}
                    />
                    <button onClick={addVideoMatematica}>Adicionar Vídeo</button>
                </div>
            </div>
        </div>
    );
}