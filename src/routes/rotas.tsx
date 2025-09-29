import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Materias from "../pages/Materias";
import DV from "../pages/DV";
import DA from "../pages/DA";
import Jogo from "../pages/forca/Jogo";
import Games from "../pages/Games";
import HistInf from "../pages/Histinf";
import Historia from "../pages/historia";
import Ingles from "../pages/Ingles";
import Matematica from "../pages/Matematica";
import Most from "../pages/mostro";
import Musicas from "../pages/musicas";
import Blink from "../pages/game/Blink";
import Memory from "../pages/jogo_da_memoria/Memory";
import PaginaCriada from "../pages/PaginaCriada";
import AnimalShadowGame from "../pages/jogo_da_sobra/AnimalShadowGame";
import VideoPlayer from "../pages/videos/VideoPlayer";
import MateriaCriadas from "../pages/materiaCriada";
import OppositeGame from "../pages/jogo-opostos/OpositeGame";

const Rotas = () =>{
    return(
        <BrowserRouter>
            <Routes>
                < Route path="/" element = {<App/> }/>
                < Route path="/Materias" element = {<Materias />} />
                < Route path="/Ingles" element = {<Ingles/>}/>
                <Route path="/Historia" element={<Historia />} />
                <Route path="/Games" element={<Games />}/>
                <Route path="/Musicas" element={<Musicas />} />
                <Route path="/Jogo" element={<Jogo />} />
                <Route path="/HistInf" element={<HistInf />} />
                <Route path="/Mostro" element={<Most />} />
                <Route path="/Matematica" element={<Matematica />} />
                <Route path="/DV" element={<DV />} />
                <Route path="/DA" element={<DA />} />
                <Route path="/Blink" element={<Blink />} />
                <Route path="/Memory" element={<Memory />} />
                <Route path="/AnimalShadowGame" element={<AnimalShadowGame />} />
                <Route path="OppositeGame" element={<OppositeGame /> }/>
                <Route path="/VideoPlayer" element={<VideoPlayer />} />
                <Route path="/pagina-criada/:title" element={<PaginaCriada />} />
                <Route path="/materia-criada/:title" element={<MateriaCriadas />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Rotas;