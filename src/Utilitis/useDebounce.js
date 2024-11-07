import { useRef } from "react";

const useDebounce = (callbackFn, sec)=> {
    let timer = useRef(null);

    const debounceFun = ()=> {
        if(timer.current) clearTimeout(timer);
        timer.current = setTimeout(callbackFn, sec);
    }

    return debounceFun;
}

export default useDebounce;