import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
    name: "MenuSlice",
    initialState: {
        currentCategory: {path: '/', value: 'default'},
        categories: [{

        }],
        menuOpen: false
    },
    reducers: {
        toggleMenu: (state, action) => {
            state.menuOpen = !state.menuOpen;
        }
    }
})

export const selectCurrentCategory = state => state.MenuSlice.currentCategory;

export const selectCategories = state => state.MenuSlice.categories;

export const selectMenuOpen = state => state.MenuSlice.menuOpen;

export const {toggleMenu} = MenuSlice.actions;

export default MenuSlice.reducer;