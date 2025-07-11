import React from 'react';

interface PreviewProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    videoUrl: string;
}

const Preview: React.FC<PreviewProps> = ({ videoRef, videoUrl }) => {
    return (
        <div className="preview-container">
        {videoUrl ? (
            <video 
            ref={videoRef} 
            src={videoUrl} 
            controls 
            className="preview-video"
            />
        ) : (
            <div className="preview-placeholder">
            <div className="upload-prompt">
                <i className="icon-video"></i>
                <p>Upload a video to begin editing</p>
            </div>
            </div>
        )}
        </div>
    );
};

export default Preview;