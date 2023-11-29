import { configureStore } from "@reduxjs/toolkit";
import SortOptionsSlice from "../Features/SortOptions/SortOptionsSlice";
import FeedSlice from "../Features/Feed/FeedSlice";

const Store = configureStore({
    reducer: {
        SortOptionsSlice: SortOptionsSlice,
        FeedSlice: FeedSlice
    }
})

export default Store;