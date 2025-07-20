export const palavrasComDicas = [
    { palavra: 'CACHORRO', dica: 'Qual é o melhor amigo do homem' },
    { palavra: 'GATO', dica: 'Animal de estimação que mia e adora caçar ratos.' },
    { palavra: 'ELEFANTE', dica: 'Grande mamífero terrestre, com orelhas grandes e tromba' },
    { palavra: 'LOBO', dica: 'Predador alfa que uiva para a lua e vive em matilhas nas florestas' },
    { palavra: 'TIGRE', dica: 'Grande felino carnívoro, símbolo de força na Ásia, com listras únicas' },
    { palavra: 'HIPOPOTAMO', dica: 'Animal mamífero que vive na água e também é terrestre' },
    { palavra: 'GIRAFA', dica: 'Qual é o animal com o maior pesocoço '},
    { palavra: 'CANGURO', dica: 'Pode saltar até 3 metros de altura! Vive na Austrália e tem uma bolsa'},
    { palavra: 'COBRA', dica: 'Animal venenoso que se rasteja'}
];
export const escolherPalavra = () => {
    const index = Math.floor(Math.random() * palavrasComDicas.length);
    return palavrasComDicas[index];
};

export const adicionarPalavra = (novaPalavra: string, novaDica: string) => {
    const palavraNormalizada = novaPalavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ').toUpperCase();
    palavrasComDicas.push({ palavra: palavraNormalizada, dica: novaDica });
};