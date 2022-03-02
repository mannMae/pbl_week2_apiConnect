import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { storage } from "../../shared/firebase";


const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const setPreview = createAction(SET_PREVIEW, (preview => ({preview})));

function uploadImageFB(image) {
    return function (dispatch, getState, {history}){
        dispatch(uploading(true));

        const _upload = storage.ref(`images/${image.name}`).put(image);

        _upload
            .then((snapshot) =>{
                console.log(snapshot);

                snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    dispatch(uploadImage(url));
                });
            })
            .catch((err) =>{
                dispatch(uploading(false));
            });
    };
}

const initialState = {
    image_url: "",
    uploading:false,
    preview:null,
};

export default handleActions (
    {
        [UPLOAD_IMAGE] : (state, action) =>
            produce(state, (draft) =>{
                draft.image_url = action.payload.image_url;
                draft.uploading = false;
            }),
        [UPLOADING] : (state, action) =>
            produce(state, (draft) =>{
                draft.uploading = action.payload.uploading;
            }),
        [SET_PREVIEW] : (state, action) =>
            produce(state, (draft) =>{
                draft.preview = action.payload.preview;
            }),
    },
    initialState
);

const actionCreator = {
    uploadImage,
    uploadImageFB,
    setPreview,
};

export { actionCreator };