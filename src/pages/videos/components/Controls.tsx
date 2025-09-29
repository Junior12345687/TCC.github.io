import React from 'react';

interface ControlsProps {
    onPlay: () => void;
    onPause: () => void;
    onCut: () => void;
    onSeek: (time: number) => void;
    onUpload: () => void;
    disabled: boolean;
    currentTime: number;
    duration: number;
    isPlaying: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
    onPlay, 
    onPause, 
    onCut, 
    onSeek,
    onUpload,
    disabled, 
    currentTime,
    duration,
    isPlaying
}) => {
    
    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = (duration * Number(e.target.value)) / 100;
        onSeek(time);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="controls-container">
            <div className="controls-main">
                <button
                    className={`control-button ${isPlaying ? 'active' : ''}`} 
                    onClick={isPlaying ? onPause : onPlay}
                    disabled={disabled}
                >
                    <i className={`icon ${isPlaying ? 'icon-pause' : 'icon-play'}`}></i>
                    <span>{isPlaying ? 'Pausar' : 'Reproduzir'}</span>
                </button>
                
                <button 
                    className="control-button cut-button" 
                    onClick={onCut}
                    disabled={disabled}
                >
                    <i className="icon icon-scissors"></i>
                    <span>Cortar</span>
                </button>

                <button 
                    className="control-button upload-button"
                    onClick={onUpload}
                >
                    <i className="icon icon-upload"></i>
                    <span>Upload</span>
                </button>
            </div>

            <div className="time-indicator">
                <span className="time-display">{formatTime(currentTime)}</span>
                <div className="time-slider">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleSeek}
                        disabled={disabled}
                        className="slider"
                    />
                </div>
                <span className="time-display">{formatTime(duration)}</span>
            </div>
        </div>
    );
};

export default Controls;