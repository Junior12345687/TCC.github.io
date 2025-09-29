import React from "react";

export interface Clip{
    id: string;
    start: number;
    end: number;
    name: string;
}

export interface State{
    videoUrl: string;
    videoFile: File | null;
    clips: Clip[];
    currentTime: number;
    duration: number;
    isPlaying: boolean;
}

export type Action =
    | { type: "SET_VIDEO_URL"; payload: string }
    | { type: "SET_VIDEO_FILE"; payload: File | null }
    | { type: "ADD_CLIP"; payload: Clip }
    | { type: "REMOVE_CLIP"; payload: string }
    | { type: "SET_CURRENT_TIME"; payload: number }
    | { type: "SET_DURATION"; payload: number }
    | { type: "SET_PLAYING"; payload: boolean }
    | { type: "CLEAR_CLIPS" };

const initialState: State ={
    videoUrl: "",
    videoFile: null,
    clips: [],
    currentTime: 0,
    duration: 0,
    isPlaying: false,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_VIDEO_URL':
            return { ...state, videoUrl: action.payload };
        case 'SET_VIDEO_FILE':
            return { ...state, videoFile: action.payload };
        case 'ADD_CLIP':
            return { ...state, clips: [...state.clips, action.payload] };
        case 'REMOVE_CLIP':
            return { ...state, clips: state.clips.filter(clip => clip.id !== action.payload) };
        case 'SET_CURRENT_TIME':
            return { ...state, currentTime: action.payload };
        case 'SET_DURATION':
            return { ...state, duration: action.payload };
        case 'SET_PLAYING':
            return { ...state, isPlaying: action.payload };
        case 'CLEAR_CLIPS':
            return { ...state, clips: [] };
        default:
            return state;
    }
};

const useVideoEditor = () =>{
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return {state, dispatch};
}
export default useVideoEditor;