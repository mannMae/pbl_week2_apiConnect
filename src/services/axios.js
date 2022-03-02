// axios 불러오기
import axios from "axios";
// getCookie 함수 불러오기
import { getCookie } from "../shared/Cookie"


// 인스턴스 생성
const instance = axios.create({
    // baseURL을 키값으로 내장자바스크립트 객체(process.env)에서
    // REACT_APP_MAGAZINE_API_BASE_URL 접근
//    baseURL : process.env.REACT_APP_MAGAZINE_API_BASE_URL,
    baseURL : 'http://13.125.218.3/',
})
console.log(process.env)

// Cookie.js에서 가져온 getCookie함수의 반환 값을 token에 저장
// 반환값은 setCookie를 통해 저장한 tokendata
const token = getCookie("token")

export { instance, token };