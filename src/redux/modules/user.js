import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, deleteCookie } from "../../shared/Cookie";

import { instance } from "../../services/axios"

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const CHECK_USER = "CHECK_USER";


const setUser = createAction(SET_USER, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) =>({user}));
const checkUser = createAction(CHECK_USER, (user) =>({user}));

const initialState = {
    user:null,
    is_login:false,
};

const signupAxios = (username, password, nickname, pwd_check) =>{
    return function (dispatch, getState, { history }){
        console.log("signupAxios:::", username, password, nickname, pwd_check);

        const user={
            username:username,
            realName:nickname,
            password:password,
            passwordCheck:pwd_check,
        };

        instance
          .post("/user/register", user)
          .then((res) =>{
              window.alert("회원가입을 축하드립니다.");
              history.replace("/login");
          })
          .catch((err) => console.log("회원가입 실패 :", err.response));
    };
};

const loginAxios = (username, password) =>{
    return function (dispatch, getState, { history }) {
        const user = {
            username: username,
            password: password,
        };
        instance
            .post("user/login", user)
            .then((res) =>{
                return res
            })
            .then((data) => {
                console.log(data);
                const user_info = {
                    username: user.username,
                    access_token: data.headers.access_token,
                    refresh_token: data.headers.refresh_token,
                };
                setCookie("token", user_info.username)
                dispatch(setUser(user_info));
                history.replace('/');
            })
            .catch((err) => console.log("로그인 실패: ", err));
    };
};


const loginCheck = (token) =>{
    return function (dispatch, getState, { history }) {
        if (token) {
            instance
                .get("api/user", {
                    headers : {
                        Authorization: `Bearer ${token}`,
                    },
                },
                { withCredentials:true}
                )
                .then((res) =>{
                    return res.data;
                })
                .then((data) => {
                    const user_info = {
                        userId: data.userId,
                        userEmail: data.username,
                        nickname: data.nickname,
                    };
                    dispatch(checkUser(user_info));
                })
                .catch((err) => console.log(err));
        } else{
            return;
        }
    };
};

const logout = (token) =>{
    return function (dispatch, getState, { history }) {
        deleteCookie("token");
        window.alert("다음에 다시 만나요!");
        dispatch(logOut());
        history.replace("/");
    };
};


export default handleActions (
    {
        [SET_USER] : (state, action) =>
            produce(state, (draft) =>{
                draft.user = action.payload.user;
                draft.is_login = true;
            }),
        [LOG_OUT] : (state, action) =>
            produce(state, (draft) =>{
                draft.user = null;
                draft.is_login = false;
            }),
        [CHECK_USER] : (state, action) =>
            produce(state, (draft) =>{
                draft.user = action.payload.user;
                draft.is_login = true;
            }),
    },
    initialState
);

const actionCreator = {
    logOut,
    setUser,
    signupAxios,
    loginAxios,
    loginCheck,
    logout,
};

export { actionCreator };