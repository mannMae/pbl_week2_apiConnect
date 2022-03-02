import React, { useEffect } from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../components/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreator as postActions } from "../redux/modules/post";
import { actionCreator as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);
    const id = props.match.params.id;
    const is_edit = id ? true : false;
    const { history } = props;
    console.log(id);
    console.log(post_list)

    let _post = is_edit ? post_list.find((p) => p.postId === parseInt(id)) : null;
    console.log(_post)
    const [contents, setContents] = React.useState(_post ? _post.contents : "");


    const changeContents = (e) => {
        setContents(e.target.value);
    };
    console.log(contents);

    useEffect(() =>{
        if (is_edit && !_post) {
            console.log("포스트 정보가 없어요!")
            history.goBack();
            return;
        }

        if (is_edit) {
            dispatch(imageActions.setPreview(_post.imageUrl));
        }
    }, []);

    const addPost = () => {
        dispatch(postActions.addPostAxios(contents));
    };

    const editPost = () => {
        dispatch(postActions.updatePostAxios(id, { contents: contents}));
    };

    if (!is_login) {
        return (
            <Grid margin="100px 0px" padding="16px" center>
                <Text size="32px" bold>
                    로그인 후에 글을 써주세요!
                </Text>
                <Button
                    _onClick={() => {
                        history.replace("/login")
                    }}
                >
                    로그인 하러가기
                </Button>
            </Grid>
        );
    }

    return (
        <>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>
                    {is_edit ? "게시글 수정" : "게시글 작성"}
                </Text>
            </Grid>

            {/* <Grid>
                {layout_list.map((value, i) => (
                    <React.Fragment key={i}>
                        <input
                            value={value}
                            name="layout"
                            // type="radio"
                            checked={layout === value}
                            onChange={layoutPost}
                        />
                        {value === "DEFAULT" && "레이아웃(기본)"}
                        {value === "RIGHT" && "레이아웃(오른쪽 이미지)"}
                        {value === "LEFT" && "레이아웃(왼쪽 이미지)"}
                    </React.Fragment>
                ))}
            </Grid> */}
            <Grid>
                <Upload/>
            </Grid>
            <Grid padding="16px">
                <Text margin="0px" size="24px" bold>
                    미리보기
                </Text>
                    <>
                        <Image
                            shape="rectangle"
                            src={preview ? preview : "http://via.placeholder.com/400x300"}
                        />
                        
                        <Grid padding="16px">
                            <Input
                                value={contents}
                                _onChange={changeContents}
                                label="게시글 내용"
                                placeholder="게시글 작성"
                                multiLine
                            />
                        </Grid>
                    </>

                {/* {layout === "DEFAULT" && (
                    <>
                        <Image
                            shape="rectangle"
                            src={preview ? preview : "http://via.placeholder.com/400x300"}
                        />
                        
                        <Grid padding="16px">
                            <Input
                                value={contents}
                                _onChange={changeContents}
                                label="게시글 내용"
                                placeholder="게시글 작성"
                                multiLine
                            />
                        </Grid>
                    </>
                )}
                {layout === "RIGHT" && (
                    <>
                        <Grid is_flex>
                            <Grid padding="16px">
                                <Input
                                    value={contents}
                                    _onChange={changeContents}
                                    label="게시글 내용"
                                    placeholder="게시글 작성"
                                    multiLine
                                />
                            </Grid>
                            <Grid>
                                <Image
                                    shape="rectangle"
                                    src={preview ? preview : "http://via.placeholder.com/400x300"}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
                {layout === "LEFT" && (
                    <>
                        <Grid is_flex>
                            <Grid>
                                <Image
                                    shape="rectangle"
                                    src={preview? preview: "http://via.placeholder.com/400x300"}
                                />
                            </Grid>

                            <Grid padding="16px">
                                <Input
                                    value={contents}
                                    _onChange={changeContents}
                                    label="게시글 내용"
                                    placeholder="게시글 작성"
                                    multiLine
                                />
                            </Grid>
                        </Grid>
                    </>
                )} */}
            </Grid>

            <Grid padding="16px">
                {is_edit ? (
                    <Button text="게시글 수정" _onClick={editPost}></Button>
                ) : (
                    <Button text="게시글 작성" _onClick={addPost}></Button>
                )}
            </Grid>
        </>
    );
};

export default PostWrite;