import React, { useRef, useState } from "react";
import { Input, Grid, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreator as imageActions } from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.image.uploading);
    const fileInput = useRef();
    const [ fileName, setFileName ] = useState("");

    const selectFile = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            dispatch(imageActions.setPreview(reader.result));
        };
    };

    const uploadFB = () =>{
        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));
    }

    return(
        <>
            <Grid is_flex>
                <input type="file" onChange={selectFile} ref={fileInput} disabled={uploading}/>
                <Button _onClick={()=>{uploadFB()}}>업로드하기</Button>
            </Grid>
        </>
    )
}

export default Upload;