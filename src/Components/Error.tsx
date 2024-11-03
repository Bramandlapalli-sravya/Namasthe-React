import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
    const error:any = useRouteError();
    console.log(error?.error?.message, 'useRouteError')
    return (
        <div>
            {error?.error?.message}
        </div>
    )
}

export default Error;