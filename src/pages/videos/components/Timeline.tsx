import React, { useState } from 'react';
import type { Clip } from '../hooks/useVideoEditor';

interface TimelineProps {
    onVideoUpload: (file: File) => void;
    clips: Clip[];
    onRemoveClip: (id: string) => void;
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ 
    onVideoUpload, 
    clips, 
    onRemoveClip,
    currentTime,
    duration,
    onSeek 
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            onVideoUpload(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files?.[0];
        if (file && file.type.startsWith('video/')) {
            onVideoUpload(file);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleClipClick = (clip: Clip) => {
        onSeek(clip.start);
    };

    return (
        <div className="timeline-container">
            {clips.length === 0 ? (
                <div
                    className={`upload-area ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        id="video-upload"
                        className="file-input"
                    />
                    <label htmlFor="video-upload" className="upload-label">
                        <i className="icon icon-upload"></i>
                        <span>Arraste e solte um arquivo de vídeo ou clique para procurar</span>
                        <span className="file-types">Suportado: MP4, MOV, AVI, WebM</span>
                    </label>
                </div>
            ) : (
                <div className="timeline-content">
                    <div className="timeline-header">
                        <h4>Linha do Tempo</h4>
                        <span className="clip-count">{clips.length} clipe(s)</span>
                    </div>
                    
                    <div className="clips-timeline">
                        <div className="timeline-track">
                            {clips.map((clip) => (
                                <div 
                                    key={clip.id} 
                                    className="clip-item"
                                    onClick={() => handleClipClick(clip)}
                                >
                                    <div className="clip-thumbnail">
                                        <div className="clip-duration">
                                            {formatTime(clip.end - clip.start)}
                                        </div>
                                    </div>
                                    <div className="clip-info">
                                        <span className="clip-name">{clip.name}</span>
                                        <span className="clip-time">
                                            {formatTime(clip.start)} - {formatTime(clip.end)}
                                        </span>
                                    </div>
                                    <button 
                                        className="clip-remove"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRemoveClip(clip.id);
                                        }}
                                    >
                                        <i className="icon icon-close"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="timeline-progress">
                        <div 
                            className="progress-indicator"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timeline;