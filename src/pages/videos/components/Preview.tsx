import React from 'react';

interface PreviewProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    videoUrl: string;
    onTimeUpdate: () => void;
    onLoadedMetadata: () => void;
    onPlay: () => void;
    onPause: () => void;
}

const Preview: React.FC<PreviewProps> = ({ 
    videoRef, 
    videoUrl, 
    onTimeUpdate, 
    onLoadedMetadata,
    onPlay,
    onPause
}) => {
    return (
        <div className="preview-container">
            {videoUrl ? (
                <video 
                    ref={videoRef} 
                    src={videoUrl} 
                    className="preview-video"
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                    onPlay={onPlay}
                    onPause={onPause}
                />
            ) : (
                <div className="preview-placeholder">
                    <div className="upload-prompt">
                        <i className="icon icon-video"></i>
                        <h3>Editor de Vídeo Profissional</h3>
                        <p>Faça upload de um vídeo para começar a editar</p>
                        <div className="supported-formats">
                            Formatos suportados: MP4, MOV, AVI, WebM
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Preview;