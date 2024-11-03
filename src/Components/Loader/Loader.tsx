import React from "react";

const Loader = ({ filteredLength =[] }) => {
    console.log(filteredLength, 'filtered')
    return (
        <div className="loaders">
            {filteredLength?.map(()=> {
                return <div className="loader-block">
        </div>
            })}
        </div>
    )
}

export default Loader;