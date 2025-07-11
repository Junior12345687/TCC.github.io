export const palavrasComDicas = [
    { palavra: 'CACHORRO', dica: 'Animal de estimação carnivoro' },
    { palavra: 'GATO', dica: 'Felino mamífero carnívoro ' },
    { palavra: 'ELEFANTE', dica: 'O Mamífero que tem olheras grandes e se encontra nos continentes Africano e Aziatico' },
    { palavra: 'LOBO', dica: 'Mamífero carnívoro da América do Norte' },
    { palavra: 'TIGRE', dica: 'Carnívoro da  Azia' },
    { palavra: 'HIPOPOTAMO', dica: 'Animal mamivero que vive na agual e tambem e terestre' },
    
];
export const escolherPalavra = () => {
    const index = Math.floor(Math.random() * palavrasComDicas.length);
    return palavrasComDicas[index];
};

export const adicionarPalavra = (novaPalavra: string, novaDica: string) => {
    const palavraNormalizada = novaPalavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ').toUpperCase();
    palavrasComDicas.push({ palavra: palavraNormalizada, dica: novaDica });
};