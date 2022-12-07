import { useEffect } from "react";
import { useParams } from "react-router-dom";


function Room() {
    const {id} = useParams();
    useEffect(() => {

    }, [])
    return (
        <div>
           <h1>ola</h1> 
        </div>
    );
};

export {Room};