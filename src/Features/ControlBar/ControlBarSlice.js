import { createSlice } from "@reduxjs/toolkit";


const ControlBarSlice = createSlice({
    name: "ControlBarSlice",
    initialState: {
        hd: false,
        audio_available: false,
        muted: true
    },
    reducers: {
        setAudioAvailable: (state, action) => {
            state.audio_available = action.payload;
        },
        toggleMuted: (state, action) => {
            state.muted = !state.muted;
        },
        toggleHdQuality: (state, action) => {
            state.hd = !state.hd;
        }
    }

})

export const selectHDState = state => state.ControlBarSlice.hd;

export const selectAudioAvailableState = state => state.ControlBarSlice.audio_available;

export const selectMutedState = state => state.ControlBarSlice.muted;

export const {toggleMuted, setAudioAvailable, toggleHdQuality } = ControlBarSlice.actions;

export default ControlBarSlice.reducer;