import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {LoadForm } from "../../utils/form";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

interface Props {
    setShowModal: any
}

const HotelBasicInfoUpdateForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const submitLabel = "Update Hotel";
    const { id } = useParams();
    const endpoint = '/business/update/'+ id;
    
    const schema = {
       
        property_type: {
           label: "Property Type",
           value: "",
           type:"text",
           placeholder:"Property type..." 
        },
        primary_contact_name: {
           label: "Primary Contact Name",
           value: "",
           type:"text",
           placeholder:"Primary contact Name..." 
        },
        primary_contact_email: {
            label: "Primary Contact Email",
            value: "",
            type:"email",
            placeholder:"Primary Contact Email..."
        },
        primary_contact_number: {
            label: "Primary Contact Number",
            value: "",
            type:"text",
            placeholder:"Primary Contact Number..."
        },

    }

    return(
        <FormWrapper>
        <h3 className="form-title plain">Update Basic Info</h3>
           {LoadForm(schema, submitLabel, endpoint)}
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default HotelBasicInfoUpdateForm;
