import { configureStore } from "@reduxjs/toolkit";
import SortOptionsSlice from "../Features/SortOptions/SortOptionsSlice";
import FeedSlice from "../Features/Feed/FeedSlice";
import ControlBarSlice from "../Features/ControlBar/ControlBarSlice";
import MenuSlice from "../Features/Menu/MenuSlice";

const Store = configureStore({
    reducer: {
        SortOptionsSlice: SortOptionsSlice,
        FeedSlice: FeedSlice,
        ControlBarSlice: ControlBarSlice,
        MenuSlice: MenuSlice
    }
})

export default Store;