import React, { useEffect, useState } from "react";
import { Grid, Image, Text } from "../elements";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment";
import Like from "./Like";
import { history } from  "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreator as likeActions } from "../redux/modules/like";
import styled from "styled-components";

const Post = (props) =>{
    const dispatch = useDispatch();
    
    useEffect(() =>{
        dispatch(likeActions.getLikeAxios(props.id));
    }, []);

    const today = (moment().format());
    const createdAt = moment(props.createdAt).hours();
    console.log(today)
    console.log(createdAt)
    const timeDiff = Math.abs(moment(today).hours() - createdAt);
    console.log(timeDiff)
    console.log(props)

    return (
        <>
            <PostBox>
                <Grid is_flex padding="16px">
                    <Grid is_flex width="auto">
                        <AccountCircleIcon style={{ marginRight: "4px"}}/>
                        <Text bold>{ props.username}</Text>
                    </Grid>
                    <Grid width="auto">
                        <Text>{timeDiff}시간 전</Text>
                    </Grid>
                </Grid>
                <Grid
                    _onClick={()=>{
                        history.push(`/post/${props.postId}`);
                    }}
                >
                                            <>
                            <Grid padding="16px">
                                <Text>{props.contents}</Text>
                            </Grid>
                            <Grid>
                                <Image shape="rectangle" src={props.image}/>
                            </Grid>
                        </>

                    {/* {layout === "DEFAULT" && (
                        <>
                            <Grid padding="16px">
                                <Text>{props.contents}</Text>
                            </Grid>
                            <Grid>
                                <Image shape="rectangle" src={props.imgUrl}/>
                            </Grid>
                        </>
                    )}
                    {layout === "RIGHT" &&(
                        <Grid is_flex>
                            <Grid padding="16px">
                                <Text>{props.contents}</Text>
                            </Grid>
                            <Grid>
                                <Image shape="rectangle" src={props.imageUrl}/>
                            </Grid>
                        </Grid>
                    )}
                    {layout === "LEFT" && (
                        <Grid is_flex>
                            <Grid>
                                <Image shape="rectangle" src={props.img_url} />
                            </Grid>
                            <Grid>
                                <Text>{props.contents}</Text>
                            </Grid>
                        </Grid>
                    )} */}
                </Grid>
                <Grid is_flex padding="5px 16px">
                    <Like postId={props.postId} likeCount={props.likeCount} ></Like>
                </Grid>
            </PostBox>
        </>
    )
}

Post.defaultProps = {
    account_id:0,
    account_name:"test",
    board_id:0,
    board_status:"DEFAULT",
    contents:"귀여운 고양이?",
    image: "https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335",
    like:0,
    time:[],
};

const PostBox = styled.div`
    border:1px solid #e7c1ff;
    border-radius:5px;
    box-shadow:5px 5px 5px #e7c1ff;
`;

export default Post;