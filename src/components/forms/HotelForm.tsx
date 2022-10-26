import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {LoadForm } from "../../utils/form";
import {useNavigate} from 'react-router-dom';
 

interface Props {
    setShowModal: any
}

const HotelForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const submitLabel = "Create Hotel";
    const endpoint = '/business/create';
    const schema = {
       name: {
            required:"required",
            label: "Hotel Name",
            value: "",
            type:"text",
            placeholder:"Enter hotel name"
        },
        market: {
            label: "Market",
            value: "",
            type:"db_select",
            model:"market",
            options:[],
            model_display_col:['market_name'],
            placeholder:"Select Market"
        },
         category: {
            label: "Category",
            value: "",
            type:"db_select",
            model:"category",
            options:[],
            model_display_col:['category_name'],
            placeholder:"Select Category"
        },
        location: {
            label: "Location",
            value: "",
            type:"places",
            placeholder:"Start typing location..."
        },

    }


    return(
        <FormWrapper>
        <h3 className="form-title plain">Create New Hotel</h3>
           {LoadForm(schema, submitLabel, endpoint)}
           <button class="btn btn-danger" onClick={()=>props.setShowModal()} style={{
    float: "right", marginTop:-30}}>Cancel</button>
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default HotelForm;