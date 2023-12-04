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

            let custom_search;

            let feed = [];

            const urlParams = new URLSearchParams(window.location.search);

            const {default_sources, current} = getState().FeedSlice;

            const post_id = urlParams.get('post');
            
            let first_post;

            if (post_id && newFeed && post_id !== 'advert') {
                const post = await Axios.get(`https://www.reddit.com/comments/${post_id}/.json`).then(res => {
                    try {
                        return res.data[0].data.children[0].data;
                    } catch (e) {
                        return null;
                    } 
                    
                }).catch(e => {return null})

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

                let custom_exists = current.findIndex(d => d.custom_search);

                if (custom_exists !== -1) {
                    src = current[custom_exists].src;

                    after = current[custom_exists].after;

                    custom_search = current[custom_exists].custom_search;

                } else {
                    let indx = Math.floor((Math.random() * (current.length)));

                    src = current[indx].src;
    
                    after = current[indx].after;
    
                    custom_search = current[indx].custom_search;
                }

                
            }
            
            if (current.length === 0 && window.location.pathname !== '/' && !exists) {

                const category = await Axios.get(`https://www.reddit.com/subreddits/search.json?q=${window.location.pathname}`).then(res => {
                    return res.data.data.children.map(c => {return {...c.data}}).filter(d => d.over18);
                }).catch(e => {
                    return rejectWithValue({error: true, errorMessage: "Error 404 Not Found"});
                })
                
                new_current = [{src: window.location.pathname.split('/')[1], after: false, custom_search: true}, ...category.slice(0, 2).map(d => {return {src: d.display_name, after: false}})];
             
                let indx = 0;
               
                src = new_current[indx].src;

                custom_search = true
            }
           
            let data;

            if (custom_search) {
               data = await Axios.get(`https://www.reddit.com/search.json?q=${src}&sort=relevance${after ? `&after=${after}` : ''}`)
                .then(data => {
    
                    const posts = data.data.data.children.map(c => {return {...c.data}}).filter(d => (d.preview || d.gallery_data) && d.selftext.length === 0 && d.over_18 && d.post_hint !== 'link')
                    
                    if (posts.length === 0 && new_current?.length === 1) return rejectWithValue({error: true, errorMessage: "404 No Results"}); 

                    return {d: posts, after: data.data.data.after, src: src, newFeed: newFeed, new_current: new_current, custom_search: custom_search, no_more_results: posts.length <= 5};
                })
                .catch(err => {
                    console.log(err);
                    return rejectWithValue({error: true, errorMessage: err.message})
                });
            } else {
                data = await Axios.get(`https://www.reddit.com/r/${src}/${sort.value}/.json${after && sort.value === 'top' ? '?after=' + after + '&t=all' : !after && sort === 'top' ? '?t=all' : after ? '?after=' + after : ''}`)
                .then(data => {
    
                    const posts = data.data.data.children.map(c => {return {...c.data}}).filter(d => (d.preview || d.gallery_data) && d.selftext.length === 0 && d.post_hint !== 'link')
    
                    return {d: posts, after: data.data.data.after, src: src, newFeed: newFeed, new_current: new_current, custom_search: custom_search};
                })
                .catch(err => {
                    console.log(err);
                    return rejectWithValue({error: true, errorMessage: err.message})
                });
            }
            
            for (let i = 0; i < data.d.length; i++) {

                feed.push(data.d[i]);

                if ((i % 3) === 0 && i !== 0) {
                    feed.push({
                        advertisement: true,
                        id: 'advert',
                    })
                }

            }
            
            let context = {posts: feed, ...data}
            console.log(context)
            return context;

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
            src: 'funny'
        },
        {
            after: false,
            src: 'memes'
        },{
            after: false,
            src: 'dankmemes'
        },{
            after: false,
            src: 'shitposting'
        }],
        loading: false,
        currentPosition: 0,
        muted: true,
        page: 0,
        direction: 0,
        error: false,
        errorMessage: "",
        verified_age: false,
        initialLoad: true,
        swipes: 0
    },
    reducers: {
        setPage: (state, action) => {
            if (action.payload[1] === -1 && state.page[0] === 0) return;
            
            state.page = action.payload[0];

            state.direction = action.payload[1];

            state.swipes++;
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

                let new_current = action.payload.new_current.map(i => {

                    if (i.src === action.payload.src) {
                        return {src: i.src, after: action.payload.after, custom_search: action.payload.custom_search}
                    } else {
                        return i;
                    }
                
                })

                if (action.payload.no_more_results) {
                    new_current = new_current.filter(d => !d.custom_search);
                }

                state.current = new_current;

            } else if (state.current.length > 0) {

                if (action.payload.no_more_results) {

                    state.current = state.current.filter(d => d.src !== action.payload.src);

                } else {

                    const src_index = state.current.findIndex(e => e.src === action.payload.src);

                    state.current[src_index].after = action.payload.after;

                }

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

export const selectSwipesCount = state => state.FeedSlice.swipes;

export const {setPage, toggleAgeVerification, setInitPost} = FeedSlice.actions;

export default FeedSlice.reducer;