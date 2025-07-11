import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { useState } from 'react';

// Configuração do FFmpeg
const ffmpeg = createFFmpeg({
    log: true,
    corePath: '/ffmpeg/ffmpeg-core.js' // Ajuste conforme sua estrutura de arquivos
});

type VideoUtilsProps = {
    onVideoProcessed?: (url: string) => void;
    onError?: (error: Error) => void;
};

export const VideoUtils = ({ onVideoProcessed, onError }: VideoUtilsProps) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);

    // Carrega o FFmpeg quando o componente é montado
    const loadFFmpeg = async () => {
        if (!ffmpeg.isLoaded()) {
        try {
            await ffmpeg.load();
        } catch (error) {
            throw new Error(`Failed to load FFmpeg: ${error instanceof Error ? error.message : String(error)}`);
        }
        }
    };

    // Cortar vídeo
    const cutVideo = async (videoFile: File, startTime: number, endTime: number): Promise<string> => {
        setIsProcessing(true);
        setProgress(0);
        
        try {
        await loadFFmpeg();

        const inputName = 'input.mp4';
        const outputName = 'output.mp4';

        // Configura callback de progresso
        ffmpeg.setProgress(({ ratio }) => {
            setProgress(Math.round(ratio * 100));
        });

        // Escreve o arquivo na memória do FFmpeg
        ffmpeg.FS('writeFile', inputName, await fetchFile(videoFile));

        // Executa o comando FFmpeg
        await ffmpeg.run(
            '-i', inputName,
            '-ss', startTime.toString(),
            '-to', endTime.toString(),
            '-c', 'copy',
            '-avoid_negative_ts', '1',
            outputName
        );

        // Lê o resultado
        const data = ffmpeg.FS('readFile', outputName);
        const videoUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));

        // Limpeza
        ffmpeg.FS('unlink', inputName);
        ffmpeg.FS('unlink', outputName);

        onVideoProcessed?.(videoUrl);
        return videoUrl;
        } catch (error) {
        const err = new Error(`Failed to cut video: ${error instanceof Error ? error.message : String(error)}`);
        onError?.(err);
        throw err;
        } finally {
        setIsProcessing(false);
        }
    };

    // Extrair frame do vídeo
    const extractFrame = async (videoFile: File, timestamp: number): Promise<string> => {
        setIsProcessing(true);
        setProgress(0);
    
        try {
        await loadFFmpeg();

        const inputName = 'input.mp4';
        const outputName = 'frame.jpg';

        ffmpeg.setProgress(({ ratio }) => {
            setProgress(Math.round(ratio * 100));
        });

        ffmpeg.FS('writeFile', inputName, await fetchFile(videoFile));

        await ffmpeg.run(
            '-i', inputName,
            '-ss', timestamp.toString(),
            '-frames:v', '1',
            '-q:v', '2',
            outputName
        );

        const data = ffmpeg.FS('readFile', outputName);
        const imageUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'image/jpeg' }));

        ffmpeg.FS('unlink', inputName);
        ffmpeg.FS('unlink', outputName);

        return imageUrl;
        } catch (error) {
        const err = new Error(`Failed to extract frame: ${error instanceof Error ? error.message : String(error)}`);
        onError?.(err);
        throw err;
        } finally {
        setIsProcessing(false);
        }
    };

    // Converter vídeo para outro formato
    const convertVideo = async (videoFile: File, format: 'mp4' | 'webm' | 'gif'): Promise<string> => {
        setIsProcessing(true);
        setProgress(0);
        
        try {
        await loadFFmpeg();

        const inputName = `input.${videoFile.name.split('.').pop()}`;
        const outputName = `output.${format}`;

        ffmpeg.setProgress(({ ratio }) => {
            setProgress(Math.round(ratio * 100));
        });

        ffmpeg.FS('writeFile', inputName, await fetchFile(videoFile));

        const args = ['-i', inputName];
        
        if (format === 'gif') {
            args.push(
            '-vf', 'fps=10,scale=640:-1:flags=lanczos',
            '-f', 'gif'
            );
        } else if (format === 'webm') {
            args.push(
            '-c:v', 'libvpx-vp9',
            '-crf', '30',
            '-b:v', '0',
            '-c:a', 'libopus'
            );
        }

        args.push(outputName);

        await ffmpeg.run(...args);

        const data = ffmpeg.FS('readFile', outputName);
        const mimeType = format === 'gif' ? 'image/gif' : `video/${format}`;
        const videoUrl = URL.createObjectURL(new Blob([data.buffer], { type: mimeType }));

        ffmpeg.FS('unlink', inputName);
        ffmpeg.FS('unlink', outputName);

        onVideoProcessed?.(videoUrl);
        return videoUrl;
        } catch (error) {
        const err = new Error(`Failed to convert video: ${error instanceof Error ? error.message : String(error)}`);
        onError?.(err);
        throw err;
        } finally {
        setIsProcessing(false);
        }
    };

    return {
        cutVideo,
        extractFrame,
        convertVideo,
        isProcessing,
        progress
    };
};

// Hook personalizado para usar o VideoUtils
export const useVideoUtils = () => {
    return VideoUtils({});
};