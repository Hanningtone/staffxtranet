import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import makeRequest from "../../utils/fetch-request";
import {useNavigate} from 'react-router-dom';
import PlaceAutoComplete from "./PlaceSelector"
import HandleSelectorGetRequest from "./SelectOptions"
 

interface Props {
    setShowModal: any
}

const HotelForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();
    let passendpoint = 'market/get';


    const handleSubmitHotel = (values:any) => {                                            
        let endpoint = '/';
        console.log(" Values Passed ", values);                                       
        setLoading(true)                                                      
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            console.log(" Response Status", response, status);
            setLoading(false)                                                 
            if(status === 200 ){
                
                navigate('/hotels')
                console.log(" Response on 200", response, status)
            } else {             
                console.log("Response error", response, status);
                setError(response.message)
            }                                                                   
        })                                                                      
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [colorHexCode, setColorHexCode] = useState("orange");

    const onSubmit = (values: any) => {
    }

    

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit(handleSubmitHotel)}>
                <h3 className="form-title plain">Create New Hotel</h3>
                <div className="modal-form-field-view">

                    <div className="">
                        <label htmlFor="name">Hotel Name</label>
                        <input type="text" className="form-control" id="name"  placeholder="Enter hotel name" 
                        aria-invalid={errors.name ? "true" : "false"}
                            {...register('name', { required: true})}
                        />
                    </div>

                    <div className="form-group my-3">
                        <label htmlFor="market">Market</label>
                        <div>
                                
                                <HandleSelectorGetRequest endpoint= "/market/get" text="market_name" column="id"/>
                                {/*Fetch from api*/}



                        </div>
                    </div>
                    
                    <div className="form-group my-3">
                        <label htmlFor="hotel-category"> Category</label>
                        <div>
                            <select className="form-control" aria-invalid={errors.category ? "true" : "false"}
                            {...register('category', { required: true})}>

                                <option value="">Select</option>

                                {/*Fetch from api*/}


                            </select>

                        </div>
                    </div>
                    <div className="form-group my-3">
                            <label htmlFor="description">Hotel Description</label>
                            <textarea className="form-control" id="description"  rows={6} aria-invalid={errors.name ? "true" : "false"}
                            {...register('description', { required: false})} placeholder="Enter a description of this hotel"></textarea>
                    </div>
                    <div className="form-group my-3">
                            {/*Work out on the autocomplete*/}                           
                            <PlaceAutoComplete/>
                             
                             {/*Placeholder*/} 

                    </div>
                </div>
                <div className="flex-row-btwn modal-bar-wrapper">
                    <button className="btn btn-danger" type="button" onClick={()=>props.setShowModal()}>Cancel</button>

                    {!loading ?
                            <button type="submit" className="btn btn-primary ms-2">   Create  </button>
                            :
                            <button type="button" className="btn btn-primary" disabled>   Please wait...  </button>
                        }
                </div>
            </form>
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default HotelForm;