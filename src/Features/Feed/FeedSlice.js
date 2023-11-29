import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from 'axios';

export const fetchFeed = createAsyncThunk(
    'FeedSlice/fetchFeed',
    async ({sort, newFeed}, {rejectWithValue, getState}) => {
        try {

            let src;

            let after;

            const {default_sources} = getState().FeedSlice;

            let indx = Math.floor((Math.random() * (default_sources.length - 1)));

            src = default_sources[indx].src;

            after = default_sources[indx].after;

            const data = await Axios.get(`https://www.reddit.com/r/${src}/${sort.value}/.json${after && sort.value === 'top' ? '?after=' + after + '&t=all' : !after && sort === 'top' ? '?t=all' : after ? '?after=' + after : ''}`)
            .then(data => {

                const posts = data.data.data.children.map(c => {return {...c.data}}).filter(d => d.preview)
                
                return {posts: posts, after: data.data.data.after, src: src, newFeed: newFeed};
            })
            .catch(err => {
                return rejectWithValue({error: true, errorMessage: err.message})
            });
            console.log(data)
            return data;

        } catch (error) {
            console.log(error);
            return rejectWithValue({error: true, errorMessage: error.message});
        }
    }
)

const FeedSlice = createSlice({
    name: "FeedSlice",
    initialState: {
        feed: [],
        current: {},
        default_sources: [{
            after: false,
            src: 'nsfw'
        },
        {
            after: false,
            src: 'porn'
        },{
            after: false,
            src: 'HDLesbianGifs'
        },{
            after: false,
            src: "NewYorkNineWild"
        },{
            after: false,
            src: "girlsmasturbating"
        },{
            after: false,
            src: 'ass'
        }, {
            after: false,
            src: 'pussy'
        }],
        loading: false,
        currentPosition: 0,
        muted: true
    },
    reducers: {
        setCurrentPosition: (state, action) => {
            state.currentPosition = action.payload;
        }
    },
    extraReducers: {
        [fetchFeed.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchFeed.fulfilled]: (state, action) => {
            state.loading = false;

            if (action.payload.newFeed) {
                state.feed = action.payload.posts
            } else {
                state.feed = [...state.feed, ...action.payload.posts]
            }
            
            const src_index = state.default_sources.findIndex(e => e.src === action.payload.src);

            state.default_sources[src_index].after = action.payload.after;
        
        },
        [fetchFeed.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})

export const selectFeed = state => state.FeedSlice.feed;

export const selectFeedLoading = state => state.FeedSlice.loading;

export const selectCurrentPosition = state => state.FeedSlice.currentPosition;

export const {setCurrentPosition} = FeedSlice.actions;

export default FeedSlice.reducer;