import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreator as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid, Button } from "../elements";
import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";

const PostList = (props) =>{
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    console.log(post_list)
    
    useEffect(() => {
        if (post_list.length<2){
            console.log("haha")
            dispatch(postActions.getPostAxios());
        }
    }, [post_list]);
    console.log(post_list)

    return (
        <>
            <Grid padding="12px 0px">
                <InfinityScroll>
                    {post_list.map((p) =>{
                        console.log(p)
                        return (
                            <Grid bg="#fff" margin="8px 0px" key={p.postId}>
                                <Post {...p}/>
                            </Grid>
                        );
                    })}
                </InfinityScroll>
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
        </>
    )
}

export default PostList;