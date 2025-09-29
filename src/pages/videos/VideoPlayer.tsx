import React, { useState, useRef, useCallback } from 'react';
import Preview from './components/Preview';
import Timeline from './components/Timeline';
import Controls from './components/Controls';
import useVideoEditor, { type Clip } from './hooks/useVideoEditor';
import './index.css';

const VideoEditor: React.FC = () => {
    const { state, dispatch } = useVideoEditor();
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleVideoUpload = useCallback(async (file: File) => {
        const videoUrl = URL.createObjectURL(file);
        dispatch({ type: "SET_VIDEO_URL", payload: videoUrl });
        dispatch({ type: "SET_VIDEO_FILE", payload: file });
    }, [dispatch]);

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
            dispatch({ type: "SET_PLAYING", payload: true });
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            dispatch({ type: "SET_PLAYING", payload: false });
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            dispatch({ type: "SET_CURRENT_TIME", payload: videoRef.current.currentTime });
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            dispatch({ type: "SET_DURATION", payload: videoRef.current.duration });
        }
    };

    const handleSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            dispatch({ type: "SET_CURRENT_TIME", payload: time });
        }
    };

    const handleCut = async () => {
        if (!state.videoUrl || !videoRef.current) return;
        
        try {
            setIsProcessing(true);
            setProgress(0);
            
            const currentTime = videoRef.current.currentTime;
            const start = Math.max(0, currentTime - 2);
            const end = Math.min(state.duration, currentTime + 2);
            
            // Simulação de processamento
            await new Promise(resolve => {
                const interval = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= 100) {
                            clearInterval(interval);
                            resolve(null);
                            return 100;
                        }
                        return prev + 5;
                    });
                }, 100);
            });
            
            const newClip: Clip = {
                id: Date.now().toString(),
                start,
                end,
                name: `Clip ${state.clips.length + 1}`
            };
            
            dispatch({ type: "ADD_CLIP", payload: newClip });
            
        } catch (error) {
            console.error("Error processing video:", error);
        } finally {
            setIsProcessing(false);
            setProgress(0);
        }
    };

    const handleRemoveClip = (id: string) => {
        dispatch({ type: "REMOVE_CLIP", payload: id });
    };

    return (
        <div className="editor-container">
            <header className="editor-header">
                <h1>Editor de Vídeo Pro</h1>
                <div className="header-info">
                    {state.videoFile && (
                        <span className="file-name">{state.videoFile.name}</span>
                    )}
                </div>
            </header>
            
            <div className="editor-main">
                <div className="preview-section">
                    <Preview 
                        videoRef={videoRef}
                        videoUrl={state.videoUrl}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onPlay={handlePlay}
                        onPause={handlePause}
                    />
                    
                    {isProcessing && (
                        <div className="progress-overlay">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <span>Processando vídeo: {Math.round(progress)}%</span>
                        </div>
                    )}
                </div>
                
                <div className="timeline-section">
                    <Timeline
                        onVideoUpload={handleVideoUpload}
                        clips={state.clips}
                        onRemoveClip={handleRemoveClip}
                        currentTime={state.currentTime}
                        duration={state.duration}
                        onSeek={handleSeek}
                    />
                </div>
            </div>
            
            <div className="editor-controls">
                <Controls
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onCut={handleCut}
                    onSeek={handleSeek}
                    onUpload={handleUploadClick}
                    disabled={!state.videoUrl || isProcessing}
                    currentTime={state.currentTime}
                    duration={state.duration}
                    isPlaying={state.isPlaying}
                />
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="video/*"
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default VideoEditor;
