import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreator as postActions, getPost } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid, Button } from "../elements";
import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";
import { instance } from "../services/axios";


import {memo, useCallback } from "react";
import styled, {createGlobalStyle } from "styled-components";
import Item from "../shared/Item";
import Loader from "../shared/Loader";


const PostList = (props) =>{
    const _user = useSelector((state) => state.user)
    console.log(_user);
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    console.log(post_list)
    
    // useEffect(() => {
    //         dispatch(postActions.getPostAxios());
    // },[_user]);
    // const getPostpost = () =>{
    //     dispatch(postActions.getPostAxios());

    // }


    //

    const [items, setItems] = useState([]);
    console.log(items);

    const [posts, setPosts] = useState([]);
    console.log(posts);

    const [isLoading, setIsLoading] = useState(true);
    console.log(isLoading);

    // const fetchPost = async () =>{
    //     setIsLoading(true);
    //     setItems(items.concat(posts.slice(0,3)));
    //     setPosts(posts.slice(3));
    //     setIsLoading(false);
    // }
    

    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemLists, setItemLists] = useState([1]);
    const [count, setCount] = useState(0);
    console.log("count", count);
    useEffect(() => {
        setCount(count+1)
        console.log(itemLists);
    }, [itemLists]);

    const postData = {
        postId:31
    }
    const _post = Array.prototype.slice.call(post_list)
    console.log(_post)
    const postNumber = 31
    console.log(postNumber)
    const getMoreItem = async() =>{
        setIsLoaded(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        dispatch(postActions.getPostAxios(count))
        let Items = post_list
        setItemLists((itemLists) => itemLists.concat(Items));
        setIsLoaded(false);
    };

    const onIntersect = async ([entry], observer) =>{
        if(entry.isIntersecting && !isLoaded){
            observer.unobserve(entry.target);
            await getMoreItem();
            observer.observe(entry.target);
        }
    };

    useEffect(() =>{
        let observer;
        if (target) {
            observer = new IntersectionObserver(onIntersect, {
                threshold:0.4,
            });
            observer.observe(target);
        }
        return() => observer && observer.disconnect();
    }, [target]);


    return (
        <>
            <Grid padding="12px 0px">
                    {/* {post_list.map((p) =>{
                        console.log(p)
                        return (
                            <Grid bg="#fff" margin="8px 0px" key={p.postId}>
                                <Post {...p}/>
                            </Grid>
                        );
                    })} */}

                            <>
            <GlobalStyle />
            <AppWrap>
            {post_list.map((p) =>{
                        console.log(p)
                        return (
                            <Grid bg="#fff" margin="8px 0px" key={p.postId}>
                                <Post {...p}/>
                            </Grid>
                        );
                    })}                <div ref={setTarget} className="Target-Element">
                    {isLoaded && <Loader />}
                </div>
            </AppWrap>
        </>

                <Permit>
                    <Button
                        is_float
                        text="+"
                        _onClick={() =>{
                            history.push("/write");
                        }}
                    ></Button>
                </Permit>
            </Grid>
            {/* <button onClick={getPostpost}>다시요청</button> */}
        </>
    )
}


const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        box-sizing:border-box;
        padding:0px;
        margin:0px;
    }

    body{
        background-color:#f2f5f7;
    }
`;

const AppWrap = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-align:center;
    align-items:center;

    .Target-Element{
        width:100vw;
        height:140px;
        display:flex;
        justify-content:center;
        text-align:center;
        align-items:center;
    }
`;

export default PostList;