import {IAction, IState } from "./Interface";

const Reducer = (state: IState, action: IAction): IState => { 
    let key = action.key;                 
    switch (action.type) {                                                      
        case 'CREATE':                                                             
            return {                                                            
                ...state,                                                       
                [key]: action.payload                                           
            };                                                                                                                                      
        case 'UPDATE':                                                        
            return {                                                            
                ...state, [key]: action.payload                                                
            };  
        case 'DELETE':                                                        
            //const { [key]: foo, ...rest } = state;
            //state = rest;
            return state;                                        
        default:                                                                
            return state;                                                       
    }                                                                           
};                                                                              
                                                                                
export default Reducer; 