import React from "react";
import Loadable from "react-loadable";
import { Spinner } from "../elements";

const Loading = () =>{
    return (
        <div>
            <Spinner>LOADING </Spinner>
        </div>
    )
}

export const Login = Loadable({
    loader: () => import("./Login"),
    loading: Loading,
})

export const SignUp = Loadable({
    loader: () => import("./Signup"),
    loading: Loading,
})

export const Main = Loadable({
    loader : () => import("./PostList"),
    loading:Loading,
})

export const Detail = Loadable({
    loader : () => import("./PostDetail"),
    loading:Loading,
})

export const Write = Loadable({
    loader : () => import("./PostWrite"),
    loading:Loading,
})

export const Update = Loadable({
    loader : () => import("./PostWrite"),
    loading:Loading,
})

// import PostList from "../pages/PostList";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import PostWrite from "../pages/PostWrite";
// import PostDetail from "../pages/PostDetail";

// export { PostList, Login, Signup, PostWrite, PostDetail};