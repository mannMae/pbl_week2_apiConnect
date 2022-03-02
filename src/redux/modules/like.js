import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { instance, token } from "../../services/axios";

const SET_LIKE = "SET_LIKE;"
const ADD_LIKE = "ADD_LIKE";
const CANCEL_LIKE = "CANCEL_LIKE";

const setLike = createAction(SET_LIKE, (postId) => ({postId}));

const addLike = createAction(ADD_LIKE, (postId) => ({postId}));

const cancelLike = createAction(CANCEL_LIKE, (postId) => ({postId}));

const initialState = {
    newLikeCnt:0,
    message:"",
};

const getLikeAxios = (postId) => {
    return function (dispatch, getState, { history }){
        if(!postId){
            return;
        }


        instance
            .get(`api/post/like`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            { withCredentails:true}
            )
            .then((docs) => {
                console.log(docs);
                dispatch(setLike(postId));
            })
            .catch((err) => {
                console.log('like::: ', err.response);
            });
    };
};

const addLikeAxios = (postId) =>{
    return function (dispatch, getState, { history }) {
        console.log(postId)

        const _user = getState().user.user;
        console.log(_user);
        const user_info = {
            username: _user.username,
            access_token : _user.access_token,
            refresh_token : _user.refresh_token,
        };

        instance
            .get(
                `api/post/like`,
                {
                    headers:{
                        ACCESS_TOKEN:user_info.access_token,
                        REFRESH_TOKEN:user_info.refresh_token,
                    },
                },
                { withCredentials: true}
            )
            .then((docs) => {
                console.log(docs);
                dispatch(addLike(postId));
            })
            .catch((err) => {
                console.log("like::: ", err.response);
            });
    };
};

const cancelLikeAxios = (postId) =>{
    return function (dispatch, getState, { history }) {
        
        const _user = getState().user.user;
        console.log(_user);
        const user_info = {
            username: _user.username,
            access_token : _user.access_token,
            refresh_token : _user.refresh_token,
        };

        instance
            .get(
                `api/post/like`,
                {
                    headers:{
                        ACCESS_TOKEN:user_info.access_token,
                        REFRESH_TOKEN:user_info.refresh_token,
                    },
                },
                { withCredentials: true}
            )
            .then((docs) =>{
                dispatch(cancelLike(postId))
            })
            .catch((err) =>{
                console.log("like::: ", err.response);
            });
    };
};

export default handleActions(
    {
        [SET_LIKE] : (state, action) =>
            produce(state, (draft) => {
                draft.list.push(...action.payload.user_list);
            }),
        [ADD_LIKE] : (state, action) =>
            produce(state, (draft) => {
                draft.list.push(...action.payload.post_list);
            }),
        [CANCEL_LIKE] : (state, action) => 
            produce(state, (draft) => {

            }),
    },
    initialState
);

const actionCreator = {
    getLikeAxios,
    addLikeAxios,
    cancelLikeAxios,
};

export { actionCreator };