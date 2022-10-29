import {createContext, useReducer, useEffect} from "react";                                
import Reducer from './Reducer'                                                 
                                                                                
                                                                                
const initialState = {                                                          
    error: null,                                                                
    user:null                                  
};                                                                              
                                                                                
const Store = ({children}) => {                                                 
    const [state, dispatch] = useReducer(Reducer, initialState);                
                                                                                
    useEffect(() => {  
        const fetchLocatData = async () => {
            const localState = localStorage.getItem('user');
            const stateValue = await JSON.parse(localState || '{}'); 
            if (stateValue && stateValue !== "{}") {   
                dispatch({type: 'SET', key:'user', payload: stateValue}); 
            }  
         }
         fetchLocatData().catch(console.error);                                                                  
    }, []);                                                                     
                                                                                
    useEffect(() => {           
        localStorage.setItem('user', JSON.stringify(state.user))                    
    }, [state?.user])                                                                 
    return (                                                                    
        <Context.Provider value={[state, dispatch]}>                            
            {children}                                                          
        </Context.Provider>                                                     
    )                                                                           
};                                                                              
                                                                                
export const Context = createContext(initialState);                             
export default Store;  

