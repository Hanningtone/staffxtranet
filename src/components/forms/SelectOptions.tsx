import {useState, useContext, useEffect, useCallback} from "react";
import makeRequest from "../../utils/fetch-request";
import { useForm } from "react-hook-form";


	const HandleSelectorGetRequest = (props:{endpoint:string, column:any, text:any}) => {        
					    
		    const [error, setError] = useState();
		    const [options, setOptions] = useState();

		    useEffect(() => {

	        makeRequest({url: props.endpoint, method: 'GET', data: null}).then(([status, response]) => {
	            

	            if(status !==200){
	            	setError(response.message)
	            	console.log(response.data)
	            
	            } else {             	
      				setOptions(response.data);

	            }                                                                   
	        });
	        }, []);

	      

	    return (
               <>
               <select className="form-control">

                  <option value="">Select</option>

              { 	options && options?.map( (eachObject) => {

               	
                 <option key={eachObject.id} value={eachObject.id}> {eachObject.market_name} </option>

                 

               })
               }
               	

               </select>
               	
               </>

	          )                                                                       
	    }

export default HandleSelectorGetRequest;
