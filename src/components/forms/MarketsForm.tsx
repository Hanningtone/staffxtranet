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
    const [responseMessage, setResponseMessages] = useState<any>();

    const handleSelect = (country: any) => {
    }

    const onSubmit = (values: any) => {
        let endpoint = '/markets/create';
        
        makeRequest({url:endpoint, method:"post", data:values}).then(([status, result]) => {
            console.log("Result is ", result, "status is ", status);
            if(status > 299){
                if(status < 500) { 
                    const field_errors:any = {};
                    Object.entries(result?.data).forEach( ([key, value]) =>  {
                    });
                    setResponseMessages({status:false, message:result.message});
                } else {
                    setResponseMessages({status:false, message:"Failed to create market due to error"});
                }
            } else {
                 setResponseMessages({status:true, message:result.message, data:result});
                dispatch({type:"SET", key:"page", payload:state?.page === 0 ? 1: 0 });
            } 
        });
    }

    return(
        <FormWrapper>
        { responseMessage?.status === true && (<div className = {
             `alert alert-${responseMessage?.status === true ? 'success': 'danger'}`} role="alert">
              {responseMessage?.message} 
            </div>) }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Market Title</label>
                    <input type="text" className="form-control" id="marketName" aria-invalid={errors.categoryName ? "true" : "false"}
                    {...register('market_name', { required: true})}/>
                     {errors.market_name && (
                        <span role="alert" className="form-alert">Enter market name</span>
                     )}
                </div>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Country</label>
                    <input  type="text" className="form-control"  disabled id="country" {...register('country', {value:"Kenya"})}/>
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
