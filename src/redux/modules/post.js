import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";

import { storage } from "../../shared/firebase";
import { actionCreator as imageActions } from "./image";

import { instance, token } from "../../services/axios";

const GET_POST = "GET_POST";
const GET_ONE_POST = "GET_ONE_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

export const getPost = createAction(GET_POST, (post_list,paging) =>({
    post_list,
    paging,
}));

const getOnePost = createAction(GET_ONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (postId, post) =>({
    postId,
    post,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
    list:[],
    paging: {start: null, next:null, size:3},
    is_loading:false,
}

const initialPost = {
    contents: "testContents_admin",
    image: "testUrl_admin",
};

const getPostAxios = (count, size = 3) =>{
    return function (dispatch, getState, { history }){
        const _user = getState().user.user;

        const postData = {
        }

        if(_user){
            console.log("hihi")
            const user_info = {
                username: _user.username,
                access_token : _user.access_token,
                refresh_token : _user.refresh_token,
            };
                let _paging = getState().post.paging;
                if (_paging.start&&!_paging.next){
                    return;
                }
                dispatch(loading(true));
                instance
                    .get("api/post",
                        {   
                            headers: {
                                PAGING_CNT:count,
                                ACCESS_TOKEN:user_info.access_token,
                                REFRESH_TOKEN:user_info.refresh_token,
                            },
                        },
                        { withCredentials:true}
                    )
                    .then((res) =>{
                        console.log(res)
                        dispatch(getPost(res.data, false));
                    })
                    .catch((err) => console.log("getPostAxios :::", err.message))
        }

        let _paging = getState().post.paging;
        if (_paging.start&&!_paging.next){
            return;
        }
        dispatch(loading(true));
        instance
            .get("api/post",
                {   
                    headers: {
                        PAGING_CNT:count,
                        ACCESS_TOKEN:null,
                        REFRESH_TOKEN:null,
                    },
                },
                { withCredentials:true}
            )
            .then((res) =>{
                console.log(res)
                dispatch(getPost(res.data, false));
            })
            .catch((err) => console.log("getPostAxios :::", err.message))
    };
};

//Axios??? ?????? ???????????? postId??? ?????? id?????? ?????? Post ????????? ???????????? ?????? ??????
const getOnePostAxios = (postId) => {
    return function (dispatch, getState, { history }) {

        //axios????????? baseUrl??? ????????? ?????? instance ????????????
        instance
            .get(`api/post/${postId}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            },
            { withCredentials:true}
            )
            .then((res) =>{
                dispatch(getOnePost(res.data))
                history.replace(`/post/${postId}`);
            })
            .catch((err) =>{
                console.log(err);
            });
    };
};

const addPostAxios = (contents ="") => {
    return function (dispatch, getState, { history }) {
        const _user = getState().user.user;
        const user_info = {
            username: _user.username,
            access_token : _user.access_token,
            refresh_token : _user.refresh_token,
        };
        console.log(_user)
        console.log(user_info)

        const _post = {
            ...initialPost,
            contents:contents,
        };

        const _image = getState().image.preview;
        console.log(_image)

        const _upload = storage
            .ref(`images/${user_info.username}_${new Date().getTime()}`)
            .putString(_image, "data_url");

        _upload.then((snapshot) =>{
            snapshot.ref
                .getDownloadURL()
                .then((url) =>{
                    dispatch(imageActions.uploadImage(url));
                    return url;
                })
                .then((url) => {
                    const postData = { ..._post, image:url};
                    instance
                        .post(
                            "http://13.125.218.3/api/post", postData,
                            {
                                headers:{
                                    ACCESS_TOKEN:user_info.access_token,
                                    REFRESH_TOKEN:user_info.refresh_token,
                                },
                            },
                            { withCredentails:true }
                        )
                        .then((doc) => {
                            dispatch(addPost(doc.post));
                            dispatch(imageActions.setPreview(null));
                            history.replace("/");
                        })
                        .catch((err) => {
                            window.alert("????????? ????????? ????????? ????????????!");
                            console.log("post ????????? ??????????????????.", err.response);
                    });
                })
                .catch((err) =>{
                    window.alert("??? ! ????????? ???????????? ????????? ?????????!")
                    console.log("image ???????????? ??????????????????.", err);
                });
        });
    };
};

const deletePostAxios = (postId = null) =>{
    return function (dispatch, getState, { history }) {
        const _user = getState().user.user;
        console.log(_user);
        const user_info = {
            username: _user.username,
            access_token : _user.access_token,
            refresh_token : _user.refresh_token,
        };
        console.log(postId)
        if(!postId) {
            console.log('????????? ????????? ?????????!')
            return;
        }
        console.log(postId)
        instance
            .delete(`http://13.125.218.3/api/post/${postId}`,
            {
                headers:{
                    ACCESS_TOKEN:user_info.access_token,
                    REFRESH_TOKEN:user_info.refresh_token,
                },
            },
            {withCredentails:true}
            )
            .then(() =>{
                console.log("hi")
                dispatch(deletePost(postId));
                window.location.replace("/");
            })
            .catch((err) => console.log("deletePost:::", err.message));
    };
};

const updatePostAxios = (postId = null, post ={}) => {
    return function(dispatch, getState, { history }) {
        if (!postId){
            console.log("????????? ????????? ?????????!");
            return;
        }

        const _user = getState().user.user;
        console.log(_user);
        const user_info = {
            username: _user.username,
            access_token : _user.access_token,
            refresh_token : _user.refresh_token,
        };


        const _image = getState().image.preview;
        console.log(_image);
        const _postIdx = getState().post.list.findIndex((p) => p.id === postId);
        const _post = getState().post.list[0];
        console.log(_post)
        const updatePostData = {
            ...post,
            image: _post.image,
        };
        console.log(updatePostData);

        
            instance
                .put(`http://13.125.218.3/api/post/${postId}`, updatePostData,
                {
                    headers : {
                        ACCESS_TOKEN:user_info.access_token,
                        REFRESH_TOKEN:user_info.refresh_token,
        },
                    widthCredentials : true,
                })
                .then((res) => {
                    console.log(res)
                    console.log("hi")
                    dispatch(updatePost(postId, updatePostData));
                    history.replace('/')
                })
                .catch((err) => console.log("updatePost:", err.response));
            return;
        
        // else {
        //     const _upload = storage
        //         .ref(`images/${postId}_${new Date().getTime()}`)
        //         .putString(_image, "data_url");

        //     _upload.then((snapshot) =>{
        //         snapshot.ref
        //             .getDownloadURL()
        //             .then((url) =>{
        //                 console.log(url);
        //                 return url;
        //             })
        //             .then((url) =>{
        //                 instance
        //                     .put(`api/post/${postId}`,
        //                     {...post, imageUrl:url }, 
        //                     {
        //                         headers:{
        //                             ACCESS_TOKEN:user_info.access_token,
        //                             REFRESH_TOKEN:user_info.refresh_token,
        //                                         },
        //                         withCredentials : true,
        //                     })
        //                     .then(() => {
        //                         dispatch(updatePost(postId, {...post, imageUrl:url}));
        //                         history.replace('/')
        //                     })
        //                     .catch((err) =>
        //                         console.log(" ",  err.code, err.message));
        //             })
        //             .catch((err) =>{
        //                 console.log("????????? ???????????? ????????? ?????????!", err.message);
        //         });
        //     });
        // }
    };
};

export default handleActions(
    {
        [GET_POST] : (state, action) =>
            produce(state, (draft) => {
            draft.list.push(...action.payload.post_list);
            draft.is_loading = false;
            }),
        [GET_ONE_POST] : (state, action) =>
            produce(state, (draft) => {
                draft.list.push(action.payload.post);
            }),
        [ADD_POST] : (state, action) =>
            produce(state, (draft) => {
                draft.list.unshift(action.payload.post);
            }),
        [UPDATE_POST] : (state, action) =>
            produce(state, (draft) => {
                let idx = draft.list.findIndex((p) => p.id === action.payload.postId);

                draft.list[idx] = {...draft.list[idx], ...action.payload.post};
            }),
        
        [LOADING]: (state, action) =>
            produce(state, (draft) =>{
                draft.is_loading = action.payload.is_loading;
            })
        
    },
    initialState
);

const actionCreator = {
    getPost,
    getOnePost,
    addPost,
    updatePost,
    deletePost,
    getPostAxios,
    addPostAxios,
    updatePostAxios,
    getOnePostAxios,
    deletePostAxios,
};

export { actionCreator };