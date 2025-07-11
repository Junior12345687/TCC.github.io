import { useCallback, useEffect, useState } from "react";
import Teclado from "./teclado";
import Dica from "./dica";
import Forca from "./Forca";
import { escolherPalavra, adicionarPalavra } from "./palavras";

import './styles.css';

const MAX_ERROS = 6;

const Jogo = () => {
    const [palavraEscolhida, setPalavraEscolhida ] = useState({palavra:'', dica: ''});
    const [letrasCorretas, setLetrasCorretas] = useState<Set<string>>(new Set());
    const [letrasErrada, setLetrasErrada] = useState<Set<string>>(new Set());
    const [erros, setErros] = useState(0);
    const [vitoria, setVitoria] = useState(false);
    const [derrota, setDerrota] = useState(false);
    const[jogoIniciado, setJogoiniciado] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [novaPalavra, setNovaPalavra] = useState('');
    const [novaDica, setNovaDica] = useState('');

    const normalizePalavra = (palavra: string) => {
        return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ');
    };

    const iniciarJogo = useCallback(() => {
        const novaPalavra = escolherPalavra();
        setPalavraEscolhida({
            ...novaPalavra,
            palavra: normalizePalavra(novaPalavra.palavra)
        });
        setLetrasCorretas(new Set());
        setLetrasErrada(new Set());
        setErros(0);
        setVitoria(false);
        setDerrota(false);
    }, []);

    useEffect(() => {
        if (erros === MAX_ERROS) {
            setDerrota(true);
        }
    }, [erros]);

    const handleLetraClick = (letra: string) => {
        if (letrasCorretas.has(letra) || letrasErrada.has(letra) || vitoria || derrota){
            return;
        }
        if (palavraEscolhida.palavra.includes(letra)) {
            setLetrasCorretas((prev) => new Set([...prev, letra]));
        }else{
            setLetrasErrada((prev) => new Set([...prev, letra]));
            setErros((prevErros) => prevErros + 1);
        }
    };

    const reiniciarJogo = useCallback(() => {
        iniciarJogo();
    },[iniciarJogo]);

    useEffect(() => {
        if (letrasCorretas.size > 0) {  // Só checar vitória se o jogador já acertou alguma letra
            const letrasUnicas = new Set(palavraEscolhida.palavra.replace(/ /g, ''));
            if (letrasUnicas.size === letrasCorretas.size) {
                setVitoria(true);
            }
        }
    }, [letrasCorretas, palavraEscolhida.palavra]);

    const handleAdicionarPalavra = () => {
        if (novaPalavra.trim() && novaDica.trim()) {
            adicionarPalavra(novaPalavra, novaDica);
            setNovaPalavra('');
            setNovaDica('');
            setMostrarFormulario(false);
            reiniciarJogo();
        }
    };
    
    return(
        <>
            <div className="jogo-container">
                { jogoIniciado ? "" : <text id="text">Bem Vindo</text>}
                {!jogoIniciado ? (
                    <button onClick={() => {
                        setJogoiniciado(true)
                        reiniciarJogo();}
                        
                    }>Iniciar Jogo</button>
                ) : (
                    <>
                        <Forca palavra={palavraEscolhida.palavra} letrasCorretas={letrasCorretas} erros={erros}/>
                        <Dica dica={palavraEscolhida.dica}/>
                        <Teclado onLetraClicada={handleLetraClick}/>
                        <div className="palavra-container">
                            {palavraEscolhida.palavra.split(' ').map((letra, index) => (
                                <span key={`${index}-${letra}`} className="letra">
                                    {letrasCorretas.has(letra) || letrasErrada.has(letra)? letra : '_'}
                                </span>
                            ))}
                        </div>
                        {(vitoria || derrota) && (
                            <div className="result">
                                {vitoria ? 'Você venceu!' : `Você perdeu! A palavra era: ${palavraEscolhida.palavra}`}
                                <button onClick={reiniciarJogo}>Reiniciar Jogo</button>
                            </div>
                        )}
                        {jogoIniciado && (
                            <button
                                onClick={()=> setMostrarFormulario(!mostrarFormulario)}
                                className="adicionar-palavra-btn"
                            >
                                {mostrarFormulario ? 'Ocultar Formulário' : 'Adicionar Palavra'}
                            </button>
                        )}
                        {mostrarFormulario && (
                            <div className="formulario-adicionar">
                                <input
                                    type="text"
                                    value={novaPalavra}
                                    onChange={(e) => setNovaPalavra(e.target.value)}
                                    placeholder="Digite a nova palavra"
                                />
                                <input
                                    type="text"
                                    value={novaDica}
                                    onChange={(e) => setNovaDica(e.target.value)}
                                    placeholder="Digite a dica"
                                />
                                <button onClick={handleAdicionarPalavra}>Adicionar Palavra</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
export default Jogo;