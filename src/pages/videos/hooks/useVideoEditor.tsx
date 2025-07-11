import React from "react";

type State = {
    videoUrl: string;
    clips: Array<{ start: number; end: number}>;
};

type Action =
    | { type: "SET_VIDEO_URL", payload: string }
    | { type: "ADD_CLIP", payload: { start: number; end: number } };

const initialState: State = {
    videoUrl: "",
    clips: [],
};

const reducer = (state: State, action: Action): State => {
    switch (action.type){
        case 'SET_VIDEO_URL':
            return {...state, videoUrl: action.payload};
        case 'ADD_CLIP':
            return {...state, clips: [...state.clips, action.payload]};
        default:
            return state;
    }
};

const useVideoEditor = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return {state, dispatch };
};

export default useVideoEditor;