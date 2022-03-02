import React from "react";

import {Grid} from "../elements";
import Button from "@mui/material/Button";

//Redux acition 발생함수 useDispatch 불러오기 / store의 state 조회 함수 useSelector선언
import {useDispatch, useSelector } from "react-redux";
import {actionCreator as postActions} from "../redux/modules/post";

import { history } from "../redux/configureStore";

import Post from "../components/Post";
import EditButtons from "../components/EditButtons";

const PostDetail = (props) =>{
    //디스패치 함수 선언 (useDispatch()는 디스패치를 반환하는 훅 함수)
    const dispatch = useDispatch();
    // store에서 post 리듀서 안의 list 상태 값을 조회
    const post_list = useSelector((state) => state.post.list);
    // store에서 user 리듀서 안의 user 상태 값을 조회
    const user_info = useSelector((state) => state.user.user);

    // props로 받아온 값 조회
    // props는 ConnectedRouter의 history 값
    // match를 통해 선택된 Post의 id값 조회
    const id = props.match.params.id;

    // _postIdx 선언
    let _postIdx;
    // 리듀서에서 가져온 post목록을 순회하여
    // history를 통해 얻은 id값과 일치하는 postId가 있으면 해당 인덱스를 _postIdx에 저장 
    post_list.map((p, idx) => {
        if (p.postId===parseInt(id)) {
            _postIdx = idx;
        }
    });

    // id값이 일치하는 포스트가 있는 경우, 해당 포스트를 post에 저장
    const post = post_list[_postIdx];

    //페이지가 처음 그려질 때 post가 없으면 id 값과 일치하는 포스트의 데이터를 서버로 요청
    React.useEffect(() => {
        if (post) {
            return;
        }
        dispatch(postActions.getOnePostAxios(id));
    }, []);

    // 출력 값 반환
    return (
        <>
        {/* 조건부 렌더링, post가 있는 경우에만 뒤에()값을 출력  */}
            {post && (
                <>
                {/* Post 컴포넌트를 호출, props로  post에 저장된 정보 + isMe를 갱신하여 전달 */}
                    <Post {...post} isMe={post.nickname === user_info?.nickname} />
                    {/* props로 받은 post의 닉네임과 store에서 조회한 user_info의 닉네임이 동일하면 */}
                    {post.nickname === user_info?.nickname ? (
                        // 에디트 버튼 출력
                        <EditButtons {...post} />
                    ) : (
                        // post가 없는 경우 메인으로 이동하는 버튼 출력
                        <Grid center padding="16px 0px">
                            <Button
                                variant="outlined"
                                // 버튼의 클릭이벤트로 메인페이지("/")로 이동하면서 히스토리에 현재 방문기록을 메인페이지로 갱신
                                onClick={() =>{
                                    history.replace("/");
                                }}
                            >
                                메인으로
                            </Button>
                        </Grid>
                    )}
                </>
            )}
        </>
    )
}

export default PostDetail;