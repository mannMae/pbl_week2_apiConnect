import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


import { useSelector, useDispatch } from "react-redux";
import { actionCreator as userActions} from "../redux/modules/user";
import {history} from '../redux/configureStore';

import {Grid, Text} from "../elements";

import { getCookie } from "../shared/Cookie";

const Header = (props) =>{
    const dispatch = useDispatch();

    const is_login = useSelector((state) => state.user.is_login);
    

    return (
        <>
            <Grid is_flex padding="16px">
                <Grid
                  _onClick={() =>{
                      history.replace("/");
                  }}
                >
                    <Text margin="0px" size="24px" bold color="#9919e8">
                        Reactgram
                    </Text>
                </Grid>
                {is_login ? (
                    <Grid>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="contained" disabled>
                                내 정보
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={()=>{
                                    dispatch(userActions.logout());
                                }}
                            >
                                로그아웃
                            </Button>
                        </Stack>
                    </Grid>
                ) : (
                    <Grid>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                             <Button
                                variant="contained"
                                color="secondary"
                                onClick={()=>{
                                    history.push("/login");
                                }}
                            >
                                로그인
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={()=>{
                                    history.push("/signup");
                                }}
                            >
                                회원가입
                            </Button>
                        </Stack>
                    </Grid>
                )
            }
            </Grid>
        </>
    )
}



export default Header;