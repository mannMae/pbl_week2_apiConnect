import React from "react";
import { Grid, Text, Input, Button } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreator as userActions} from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Signup = (props) => {
    const dispatch = useDispatch();

    const [userEmail, setUserEmail] = React.useState("");
    const [password, setPassword ] = React.useState("");
    const [pwd_check, setPwdCheck ] = React.useState("");
    const [nickname, setNickname ] = React.useState("");

    const signup = () =>{
        if(userEmail === "" || password === "" || nickname === "" ){
            window.alert("아이디, 패스워드, 닉네임을 입력해주세요!");
            return;
        }

        if(password !== pwd_check) {
            window.alert("패스워드와 패스워드 확인이 다릅니다!");
            return;
        }

        dispatch(userActions.signupAxios(userEmail, password, nickname, pwd_check));
    };

    return (
        <>
            <Grid padding="16px">
                <Text size="32px" bold>
                    회원가입
                </Text>
                <Grid padding="16px 0px">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요."
                        _onChange={(e) =>{
                            setUserEmail(e.target.value);
                        }}
                    />
                </Grid>
                <Grid padding="16px 0px">
                    <Input
                        label="이름"
                        placeholder="이름을 입력해주세요."
                        _onChange={(e) =>{
                            setNickname(e.target.value);
                        }}
                    />
                </Grid>
                <Grid padding="16px 0px">
                    <Input
                        type="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요."
                        _onChange={(e) =>{
                            setPassword(e.target.value);
                        }}
                    />
                </Grid>
                <Grid padding="16px 0px">
                    <Input
                        type="password"
                        label="비밀번호 확인"
                        placeholder="비밀번호를 다시 입력해주세요."
                        _onChange={(e) =>{
                            setPwdCheck(e.target.value);
                        }}
                    />
                </Grid>
                <Button text="회원가입하기" _onClick={signup}></Button>
            </Grid>
        </>
    );
};

Signup.defaultProps = {};

export default Signup;