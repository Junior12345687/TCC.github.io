import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// Inicializa o FFmpeg uma vez (pode ser feito no nível do módulo)
const ffmpeg = createFFmpeg({
    log: true,
    corePath: '/path/to/ffmpeg-core.js' // Especifique isso se necessário
});

const cutVideo = async (videoFile: File, start: number, end: number): Promise<string> => {
    try {
        // Carrega o FFmpeg se ainda não estiver carregado
        if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
        }

    // Escreve o arquivo de entrada na memória do FFmpeg
    const inputFileName = 'input.mp4';
    const outputFileName = 'output.mp4';
    
    ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));

    // Executa o comando para cortar o vídeo
        await ffmpeg.run(
        '-i', inputFileName,
        '-ss', start.toString(),
        '-to', end.toString(),
        '-c', 'copy', // Evita re-encoding para maior velocidade
        '-avoid_negative_ts', '1', // Evita problemas com timestamps negativos
        outputFileName
        );

    // Lê o arquivo de saída
    const data = ffmpeg.FS('readFile', outputFileName);
    
    // Limpeza dos arquivos temporários
    ffmpeg.FS('unlink', inputFileName);
    ffmpeg.FS('unlink', outputFileName);

    // Cria a URL do blob
        return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    } catch (error) {
        console.error('Error cutting video:', error);
        throw new Error(`Failed to cut video: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Exemplo de uso
const processVideo = async () => {
  const videoFile = /* seu arquivo de vídeo */;
  const startTime = 10; // tempo inicial em segundos
  const endTime = 20;   // tempo final em segundos

    try {
        const videoUrl = await cutVideo(videoFile, startTime, endTime);
        console.log('Video cut successfully:', videoUrl);
        // Você pode usar o `videoUrl` para exibir o vídeo cortado
    } catch (error) {
        console.error('Failed to cut video:', error);
    }
};

processVideo();