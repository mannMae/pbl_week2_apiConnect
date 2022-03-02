import React, { useCallback, useEffect, useState} from 'react';
import {Spinner} from '../elements';

const InfinityScroll = (props) =>{
    const [items, setItems] = useState([]);
    console.log(items);

    const [posts, setPosts] = useState([]);
    console.log(posts);

    const [isLoading, setLoading] = useState(true);
    console.log(isLoading);

    //const fetchPost = async () =>{
        // setIsLoading(true);
        // setItems(items.concat(posts.slice(0,3)));
        // setPosts(posts.slice(3));
        //setIsLoading(false);
    //}

    //const handleScroll = useCallback(()=>{
        //const {scrollHeight} =document.body;
        //const {innerHeight} = window;
        //const scrollTop =
            //(document.documentElement && document.documentElement.scrollTop) ||
            //document.body.scrollTop;
        //if(scrollHeight - innerHeight -scrollTop < 200) {
            //fetchPost();
        //}
    //}. [isLoading]);

    // const getFetchData = async() =>{
        //await instance
            //.get('api/post')
            //.then((res) =>{
                //let resp = res.data;
                //setItems(resp.slice(0, 3));
                //resp = resp.slice(3);
                //setPosts(resp);
                //setIsLoading(false);
            //})
            //.catch((err) => {
                //return Promise.reject(err);
            //});
    //};

    // useEffect(() =>{
    //     getFetchData();
    // });

    // useEffect(() =>{
    //     window.addEventListener('scroll', handleScroll, true);
    //     return () => window.removeEventListener('scroll', handleScroll, true);
    // }, [handleScroll]);

    return (
        <>
            {props.children}
            {isLoading && <Spinner/>}
        </>
    )
}

InfinityScroll.defaultProps = {};

export default InfinityScroll;