import React from 'react';

interface ControlsProps {
    onPlay: () => void;
    onPause: () => void;
    onCut: () => void;
    disabled: boolean;
    }

    const Controls: React.FC<ControlsProps> = ({ 
    onPlay, 
    onPause, 
    onCut, 
    disabled 
    }) => {
    return (
        <div className="controls-container">
        <button 
            className="control-button" 
            onClick={onPlay}
            disabled={disabled}
        >
            <i className="icon-play"></i>
            <span>Play</span>
        </button>
        <button 
            className="control-button" 
            onClick={onPause}
            disabled={disabled}
        >
            <i className="icon-pause"></i>
            <span>Pause</span>
        </button>
        <button 
            className="control-button cut-button" 
            onClick={onCut}
            disabled={disabled}
        >
            <i className="icon-scissors"></i>
            <span>Cut</span>
        </button>
        <div className="time-indicator">
            <span>00:00:00</span>
            <div className="time-slider">
            <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="0" 
                disabled={disabled}
            />
            </div>
            <span>00:00:00</span>
        </div>
        </div>
    );
};

export default Controls;