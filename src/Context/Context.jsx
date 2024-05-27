import {  createContext } from "react";
import all_img from "../Components/Assets/all_img";

export const Context = createContext(null);


const ContextProvider = (props) => {
   

    const contextValue = {
        all_img,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
