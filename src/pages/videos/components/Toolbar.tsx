import React from 'react';

interface ToolbarProps {
    disabled: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ disabled }) => {
    return (
        <div className="toolbar-container">
        <button className="tool-button" disabled={disabled}>
            <i className="icon-text"></i>
            <span>Add Text</span>
        </button>
        <button className="tool-button" disabled={disabled}>
            <i className="icon-transition"></i>
            <span>Add Transition</span>
        </button>
        <button className="tool-button" disabled={disabled}>
            <i className="icon-effects"></i>
            <span>Add Effect</span>
        </button>
        <button className="tool-button" disabled={disabled}>
            <i className="icon-filter"></i>
            <span>Add Filter</span>
        </button>
        <button className="tool-button export-button" disabled={disabled}>
            <i className="icon-export"></i>
            <span>Export Video</span>
        </button>
        </div>
    );
};

export default Toolbar;