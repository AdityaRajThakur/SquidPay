import React from "react" ; 
export function Center({children} :{children : React.ReactNode}) : JSX.Element{
    return <div className = "flex justify-center flex-col h-full pt-3 ">
        <div className = "flex justify-center">
            {children} 
        </div>
    </div>
}