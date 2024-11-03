import { useEffect, useState } from "react";

const UseOnlineStatus = () => {

    const [onlineStatus, setOnlineStatus] = useState(true);


    useEffect(()=> {
        window.addEventListener('offline', ()=> {
            // this logs will appear only when there is a change in network and come to offline this will trigger 
            // console.log('your offline goo awayyy'); 
            setOnlineStatus(false);
        }) 
        window.addEventListener('online', ()=> {
            // this logs will appear only when there is a change in network and come to online this will trigger 
            // console.log('your online your back');
            setOnlineStatus(true);
        })

        return ()=> {
            window.removeEventListener('offline', ()=> {
                // console.log('your offline');
                setOnlineStatus(false);
            }) 
    
            window.removeEventListener('online', ()=> {
                // console.log('your online');
                setOnlineStatus(true);
            })
        }
    }, [])

    return onlineStatus;
   
}

export default UseOnlineStatus;