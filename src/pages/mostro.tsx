import { useState } from "react";
import './mostro.css'
import "../assets/monst.jpeg"

interface video{
    title: string;
    url: string;
}

export default function Most(){
    const [mostro, setMostro] = useState([
        {title: 'Episodio 1', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 2', url: "https://www.youtube.com/embed/NhSVpKpwAo4"},
        {title: 'Episodio 3', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 4', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 5', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 6', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 7', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 8', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 9', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 10', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 11', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 12', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 13', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 14', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 15', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 16', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 17', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 18', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 19', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 20', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 21', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 22', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 23', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 24', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 25', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
        {title: 'Episodio 26', url: "https://www.youtube.com/embed/xa-seGPn9r0"},
    ]);

    return(
        <>
        <div className="body-most">
            <header className="custom-header-most">
                <h1>Os 7 Monstrinhos</h1>
            </header>
            <div className="container-most">
                {mostro.map(item =>{
                    return (
                        <div key={item.title} className='video-container-most'>
                            <a href={item.url}>
                                <iframe src={item.url} allowFullScreen title={item.title} width='200px' height='200px'></iframe>
                            </a>
                            <h2>{item.title}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}