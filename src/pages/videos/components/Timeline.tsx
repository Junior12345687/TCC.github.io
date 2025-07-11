import React, { useState } from 'react';

interface Clip {
        id: string;
        start: number;
        end: number;
        name: string;
    }

    interface TimelineProps {
        onVideoUpload: (file: File) => void;
        clips: Clip[];
    }

        const Timeline: React.FC<TimelineProps> = ({ onVideoUpload, clips }) => {
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

    return (
        <div className="timeline-container">
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
            <i className="icon-upload"></i>
            <span>Drag & drop a video file or click to browse</span>
            <span className="file-types">Supported: MP4, MOV, AVI</span>
            </label>
        </div>

        {clips.length > 0 && (
            <div className="clips-timeline">
            <div className="timeline-track">
                {clips.map((clip) => (
                <div key={clip.id} className="clip-item">
                    <div className="clip-thumbnail"></div>
                    <div className="clip-info">
                    <span className="clip-name">{clip.name}</span>
                    <span className="clip-time">
                        {formatTime(clip.start)} - {formatTime(clip.end)}
                    </span>
                    </div>
                    <button className="clip-remove">
                    <i className="icon-close"></i>
                    </button>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    );
};

export default Timeline;