import React, { useState, useRef } from 'react';
import Preview from './components/Preview';
import Timeline from './components/Timeline';
import Controls from './components/Controls';
import Toolbar from './components/Toolbar';
import useVideoEditor from './hooks/useVideoEditor';
import './index.css';

const VideoEditor: React.FC = () => {
    const { state, dispatch } = useVideoEditor();
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleVideoUpload = async (file: File) => {
        const videoUrl = URL.createObjectURL(file);
        dispatch({ type: "SET_VIDEO_URL", payload: videoUrl });
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            handleVideoUpload(files[0]);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleCut = async () => {
        if (!state.videoUrl) return;
        
        try {
            setIsProcessing(true);
            setProgress(0);
            
            const currentTime = videoRef.current?.currentTime || 0;
            const start = Math.max(0, currentTime - 5);
            const end = currentTime + 5;
            
            // Simulação de processamento (substitua pela sua função real)
            await new Promise(resolve => {
                const interval = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= 100) {
                            clearInterval(interval);
                            resolve(null);
                            return 100;
                        }
                        return prev + 10;
                    });
                }, 300);
            });
            
            dispatch({
                type: "ADD_CLIP",
                payload: {
                    start,
                    end,
                    id: Date.now().toString(),
                    name: `Clip ${state.clips.length + 1}`
                }
            });
            
            // Para demonstração, usamos a mesma URL
            // dispatch({ type: "SET_VIDEO_URL", payload: processedUrl });
        } catch (error) {
            console.error("Error processing video:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="editor-container">
            <header className="editor-header">
                <h1>Video Editor Pro</h1>
            </header>
            
            <div className="editor-main">
                <div className="preview-section">
                    {!state.videoUrl && (
                        <div className="upload-prompt">
                            <button
                                onClick={handleUploadClick}
                                className="upload-button"
                            >
                                Carregar Vídeo
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="video/*"
                                style={{ display: 'none' }}
                            />
                        </div>
                    )}
                    <Preview videoRef={videoRef} videoUrl={state.videoUrl} />
                    {isProcessing && (
                        <div className="progress-overlay">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <span>Processando: {Math.round(progress)}%</span>
                        </div>
                    )}
                </div>
                
                <div className="timeline-section">
                    <Timeline
                        onVideoUpload={handleVideoUpload}
                        clips={state.clips}
                    />
                </div>
            </div>
            
            <div className="editor-controls">
                <Controls
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onCut={handleCut}
                    onUpload={handleUploadClick}
                    disabled={!state.videoUrl || isProcessing}
                />
                <Toolbar disabled={!state.videoUrl || isProcessing} />
            </div>
        </div>
    );
};

export default VideoEditor;
