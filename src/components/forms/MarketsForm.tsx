import styled from "styled-components";
import { useForm } from "react-hook-form";//@ts-ignore
import { ReactCountryDropdown } from 'react-country-dropdown';
import 'react-country-dropdown/dist/index.css'
import makeRequest from "../../utils/fetch-request";
import React, { useEffect, useState, useContext } from 'react';
import { Context }  from '../../context';



interface Props {
    setShowModal: any
}

const CategoriesForm = (props: Props) => {
    const [ state, dispatch ] =  useContext(Context);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSelect = (country: any) => {
    }

    const onSubmit = (values: any) => {
        values = [
            {
              "name": "Kakamega",
              "country": "Kenya",
              "city": "Kakamega",
            }
          ]
        let endpoint = 'http://127.0.0.1:8002/api/1.7.2/markets/create';
        


        makeRequest({url:endpoint, method:"post", data:values}).then(([status, result]) => {
            console.log("Result is ", result, "status is ", status);
            if(status > 299){
                if(status < 500) { 
                    const field_errors:any = {};
                    Object.entries(result?.data).forEach( ([key, value]) =>  {
                    });
                    dispatch({type:"SET", key:state?.context, payload:{"status":false, "message":result.message}});
                } else {
                    dispatch({type:"SET", key:state?.context, payload:{"status":false, "message":"Internal server error"}});
                }
            } else {
                console.log("Dispatching state", state?.context,{"status":true, message:result.message, data:result} )
                dispatch({type:"SET", key:state?.context, payload:{"status":true, message:result.message, data:result}});
                dispatch({type:"SET", key:"page", payload:state?.page === 0 ? 1: 0 });
            } 
        });
    }

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Market Title</label>
                    <input type="text" className="form-control" id="marketName" aria-invalid={errors.categoryName ? "true" : "false"}
                    {...register('marketName', { required: true})}/>
                     {errors.marketName && (
                        <span role="alert" className="form-alert">Enter market name</span>
                     )}
                </div>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Country</label>
                    <input type="text" className="form-control" value="Kenya" disabled id="country"  
                    {...register('country')}/>
                     {errors.country && (
                        <span role="alert" className="form-alert">Enter country</span>
                     )}
                </div>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">City/Town/Region</label>
                    <input type="text" className="form-control" id="city" 
                     {...register('city', { required: true})}/>
                     {errors.city && (
                        <span role="alert" className="form-alert">Enter city</span>
                     )}
                </div>
                <div className="flex-row-btwn modal-bar-wrapper">
                    <button className="btn btn-outline-danger" type="button" onClick={()=>props.setShowModal()}>Close</button>
                    <button className="btn btn-outline-primary ms-2" type="submit">Save</button>
                </div>
            </form>
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default CategoriesForm;