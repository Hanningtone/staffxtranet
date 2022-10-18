import {useState, useContext, useEffect, useCallback} from "react";
import makeRequest from "../../utils/fetch-request";
import { useForm } from "react-hook-form";






	const HandleSelectorGetRequest = (props:{endpoint:string, column:any, text:any}) => {        
			
			  

			console.log('This is a property', props.endpoint)
		    
		    const [error, setError] = useState();
		    const [options, setOptions] = useState();
		    useEffect(() => {

	        makeRequest({url: props.endpoint, method: 'GET', data: null}).then(([status, response]) => {
	            
	            console.log("Response Status", response, status);
	            
	            if(status == 200 ){
	            	
      				
      				setOptions(response.data);
	            
	            } else {             	
	                console.log("Response error", response, status);
	                setError(response.message)
	            }                                                                   
	        })
	        const valueText = props.column;
	        const valueDisplay = props.text;
	        }, []);

	    return (
               <>
               <select className="form-control">

                  <option value="">Select</option>

              { 	options?.map( (eachObject) => {

               	
                 <option key={eachObject.id} value={eachObject.id}> {eachObject.market_name} </option>

                 

               })
               }
               	

               </select>
               	
               </>

	          )                                                                       
	    }

export default HandleSelectorGetRequest;
