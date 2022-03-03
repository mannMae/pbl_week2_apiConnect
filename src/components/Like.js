import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Text, Grid} from "../elements";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { actionCreator as likeActions } from "../redux/modules/like";

const Like = (props) =>{
    const likes ={
        postId:props.postId,
        likeCnt:props.likeCount,
        userLiked:props.liked,
    }
    const dispatch = useDispatch();


    const [likeCnt, setLikeCnt] = useState(likes.likeCnt);
    const [userLiked, setUserLiked] = useState(likes.userLiked);
    useEffect(()=>{
        console.log(likes.userLiked)
        setUserLiked(likes.userLiked);
    }, [likes.userLiked])

    const cancelLike = () => {

        dispatch(likeActions.cancelLikeAxios(props.postId));
        setUserLiked(false);
        setLikeCnt(likeCnt - 1);
    };

    const addLike = () => {
        dispatch(likeActions.addLikeAxios(props.postId))
        setUserLiked(true);
        setLikeCnt(likeCnt +1);
    }
    console.log(userLiked)

    return(
        <>
            <Grid is_flex padding="5px" width="150px">
                <Text>좋아요 {likeCnt}개</Text>
            </Grid>
            <div>
                {userLiked && (
                    <FavoriteIcon style={{ color:"red" }} onClick={cancelLike} />
                )}
                {!userLiked &&(
                    <FavoriteBorderIcon onClick={addLike}/>
                )}
            </div>
        </>
    )
}

export default Like;