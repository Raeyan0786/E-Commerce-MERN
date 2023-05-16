import React ,{useState} from "react"

export const Counter=()=>{
    const [count,setCount]=useState(0);
    const inc=()=>{
        setCount(count+1);
    }
    const dec=()=>{
        setCount(count-1);
        
    }
    const reset=()=>{
        setCount(0);
    }
    return(
        <div>
            <p>{count}</p>
            <button onClick={inc}>inc</button>
            <button onClick={dec}>dec</button>
            <button onClick={reset}>reset</button> 
        </div>
    )
}