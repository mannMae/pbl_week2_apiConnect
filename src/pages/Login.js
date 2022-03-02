import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import {setCookie, deleteCookie } from '../shared/Cookie';

import { useDispatch } from "react-redux";
import { actionCreator as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Login = (props) =>{
    const dispatch = useDispatch();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = () =>{

        console.log(username);

        if(username === "" || password === ""){
            window.alert("아이디 혹은 비밀번호가 입력되지 않았습니다.");
            return;   
        }

        dispatch(userActions.loginAxios(username, password));
    };

    return (
        <>
            <Grid padding="16px;">
                <Text size="32px" bold>
                    로그인
                </Text>

                <Grid padding="16px 0px">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요."
                        _onChange={(e) =>{
                            setUsername(e.target.value);
                        }}/>
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        label="패스워드"
                        placeholder="패스워드를 입력해주세요"
                        type="password"
                        _onChange={(e) =>{
                            setPassword(e.target.value);
                        }}
                        value={password}
                        is_submit
                        onSubmit={login}
                        />
                </Grid>

                <Button
                    text="로그인하기"
                    _onClick={() =>{
                        console.log("로그인 했어요!");
                        login();
                    }}
                ></Button>
            </Grid>
        </>
    )
}

export default Login;