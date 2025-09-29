import { useState } from "react"
import './games.css'
import forc from '../assets/forc.png'
import memoria from '../assets/memoria.png'
import mqdefault from '../assets/mqdefault.jpg'
import oposto from '../assets/oposto.png'

export default function Games(){
    const [jogos, setJogos ] = useState([
        {title: 'Jogo da Froca', url: forc, link:"http://localhost:5173/Jogo"},
        {title: 'Jogo da Memoria', url: memoria, link:"http://localhost:5173/Memory"},
        {title: 'Jogo da sombra', url: mqdefault, link:"http://localhost:5173/AnimalShadowGame"},
        {title: 'Jogo do Oposto', url: oposto, link:"http://localhost:5173/OppositeGame"},
        
    ])
    return (
        <>
            <div className='body-Game'>
            <header className='custom-header-Game'>
                <h1>Games</h1>
            </header>
            <div className='container-Game'>
                {jogos.map(item =>{
                return (
                    <div key={item.title} className='image-container-Game'>
                        <a href={item.link}>
                            <img src={item.url} alt={item.title} width="200px" height="200px" />
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