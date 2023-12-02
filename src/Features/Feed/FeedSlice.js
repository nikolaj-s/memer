import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from 'axios';
import { Categories } from "../../Util/Categories";

const categories = Categories;

export const fetchFeed = createAsyncThunk(
    'FeedSlice/fetchFeed',
    async ({sort, newFeed}, {rejectWithValue, getState, dispatch}) => {
        try {

            let src;

            let after;

            let new_current;

            let exists;

            const urlParams = new URLSearchParams(window.location.search);

            const {default_sources, current} = getState().FeedSlice;

            const post_id = urlParams.get('post');
            
            let first_post;

            if (post_id && newFeed) {
                const post = await Axios.get(`https://www.reddit.com/comments/${post_id}/.json`).then(res => {
                    try {
                        return res.data[0].data.children[0].data;
                    } catch (e) {
                        return null;
                    } 
                    
                })

                first_post = post;
            }

            if (first_post) {
                dispatch(setInitPost(first_post))
            }

            if (window.location.pathname === '/') {
                let indx = Math.floor((Math.random() * (default_sources.length)));
                
                src = default_sources[indx].src;

                after = default_sources[indx].after;
            } else if (current.length === 0 && window.location.pathname !== '/') {

                for (const category of categories) {
                    if (category.path === window.location.pathname) {

                        let arr = category.state.map(i => {return {src: i, after: null}})
                        
                        let indx = Math.floor((Math.random() * (arr.length)));

                        new_current = arr;

                        src = new_current[indx].src;

                        after = new_current[indx].after;
                        
                        exists = true;
                        break;
                    }
                }

            } else if (current.length > 0) {

                let indx = Math.floor((Math.random() * (current.length)));

                src = current[indx].src;

                after = current[indx].after;
            }
            
            if (current.length === 0 && window.location.pathname !== '/' && !exists) {

                const category = await Axios.get(`https://www.reddit.com/subreddits/search.json?q=${window.location.pathname}&include_over_18=on`).then(res => {
                    return res.data.data.children.map(c => {return {...c.data}}).filter(d => d.over18)[0]
                })
                
                new_current = [{src: category.display_name, after: false}]

                src = category.display_name;

            }

            const data = await Axios.get(`https://www.reddit.com/r/${src}/${sort.value}/.json${after && sort.value === 'top' ? '?after=' + after + '&t=all' : !after && sort === 'top' ? '?t=all' : after ? '?after=' + after : ''}`)
            .then(data => {

                const posts = data.data.data.children.map(c => {return {...c.data}}).filter(d => d.preview && d.selftext.length === 0)

                return {posts: posts, after: data.data.data.after, src: src, newFeed: newFeed, new_current: new_current};
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
        current: [],
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
        },{
            src: 'sexygirls',
            after: false
        },{
            src: 'AlldayfuckNSFW',
            after: false
        },{
            src: 'MagicNsfw',
            after: false
        }],
        loading: false,
        currentPosition: 0,
        muted: true,
        page: 0,
        direction: 0,
        error: false,
        errorMessage: "",
        verified_age: false,
        initialLoad: true
    },
    reducers: {
        setPage: (state, action) => {
            if (action.payload[1] === -1 && state.page[0] === 0) return;
            
            state.page = action.payload[0];

            state.direction = action.payload[1];
        },
        toggleAgeVerification: (state, action) => {
            state.verified_age = action.payload;
        },
        setInitPost: (state, action) => {
            state.initialLoad = false;
            state.feed = [action.payload];
        }
    },
    extraReducers: {
        [fetchFeed.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
            state.errorMessage = "";
        },
        [fetchFeed.fulfilled]: (state, action) => {
            state.loading = false;

            state.initialLoad = false;

            state.feed = [...state.feed, ...action.payload.posts]
            
            if (window.location.pathname === '/') {

                const src_index = state.default_sources.findIndex(e => e.src === action.payload.src);

                state.default_sources[src_index].after = action.payload.after;

            } else if (action.payload.new_current && window.location.pathname !== '/') {

                const new_current = action.payload.new_current.map(i => {
                    if (i.src === action.payload.src) {
                        return {src: i.src, after: action.payload.after}
                    } else {
                        return i;
                    }
                })

                state.current = new_current;

            } else if (state.current.length > 0) {

                const src_index = state.current.findIndex(e => e.src === action.payload.src);

                state.current[src_index].after = action.payload.after;
            }
        
        },
        [fetchFeed.rejected]: (state, action) => {
            state.loading = false;
            state.initialLoad = false;
            state.error = true;
            state.errorMessage = action.payload.errorMessage;
        }
    }
})

export const selectFeed = state => state.FeedSlice.feed;

export const selectFeedLoading = state => state.FeedSlice.loading;

export const selectPage = state => state.FeedSlice.page;

export const selectErrorState = state => state.FeedSlice.error;

export const selectErrorMessage = state => state.FeedSlice.errorMessage;

export const selectVerifiedAge = state => state.FeedSlice.verified_age;

export const selectInitialLoading = state => state.FeedSlice.initialLoad;

export const selectDirection = state => state.FeedSlice.direction;

export const {setPage, toggleAgeVerification, setInitPost} = FeedSlice.actions;

export default FeedSlice.reducer;