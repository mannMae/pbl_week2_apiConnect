import React from "react";

import { useSelector } from "react-redux";
import { getCookie } from "./Cookie";

const Permit = (props) =>{

    const is_login = useSelector((state) => state.user.is_login);

    const is_session = getCookie("token") ? true : false;

    if (is_session && is_login){
        return (
        <>
            {props.children}
        </>
        )
    }
    return null;
}

export default Permit;