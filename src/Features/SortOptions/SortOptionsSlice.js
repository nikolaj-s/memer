import { createSlice } from "@reduxjs/toolkit";


const SortOptionsSlice = createSlice({
    name: "SortOptionsSlice",
    initialState: {
        sortMenuOpen: false,
        currentSortState: {value: "hot", name: "Featured"},
        sortOptions: [
            {value: "new", name: "New"},
            {value: "hot", name: "Featured"},
            {value: "rising", name: "Top"}
        ]
    },
    reducers: {
        toggleSortMenu: (state, action) => {
            state.sortMenuOpen = !state.sortMenuOpen;
        },
        setSortState: (state, action) => {
            state.currentSortState = action.payload;
        }
    }
})

export const selectCurrentSortState = state => state.SortOptionsSlice.currentSortState;

export const selectSortMenuOpenState = state => state.SortOptionsSlice.sortMenuOpen;

export const selectSortOptions = state => state.SortOptionsSlice.sortOptions;

export const {toggleSortMenu, setSortState} = SortOptionsSlice.actions;

export default SortOptionsSlice.reducer;