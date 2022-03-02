// getCookie 함수 선언
const getCookie = (name) =>{
    // 쿠키에 접근해 객체를 value에 저장
    // split을 하기위해 첫 머리에 ; 추가
    let value = "; "+document.cookie;
    console.log(value)

    // parts(배열)로 value 값 저장
    let parts = value.split(`; ${name}=`);
    
    // parts의 길이가 2라면 => setCookie를 통해 token의 data를 저장
    // value = ; is_login=success; token=tokendata; is_login=success 
    // parts = ['; is_login=success', 'tokendata; is_login=success']
    // == 로그인 됨.
    if (parts.length ===2){
        //tokendat를 반환
        return parts.pop().split(";").shift();
    }
};

const setCookie = (name, value, exp=5) =>{
    console.log(name, value)
    document.cookie = `${name}=${value};`;
};

const deleteCookie = (name) =>{
    let date = new Date("2020-01-01").toUTCString();

    document.cookie = name + "=; expires=" + date;
};

export { getCookie, setCookie, deleteCookie};