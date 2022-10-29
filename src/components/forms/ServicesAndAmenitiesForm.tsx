import React, { useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {LoadForm } from "../../utils/form";
import {useNavigate} from 'react-router-dom';

interface Props {
    setShowModal: any
}

const ServicesAndAmenitiesForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const submitLabel = "Create Service";
    const endpoint = '/room-amenities/create';
    const { id } = useParams();
    
    const schema = {
        business_id: {
            value: id,
            type:"hidden",
        },
        name: {
            label: "Service/Amenity",
            type:"text",
            required:"Required",
            placeholder: "Enter A service or amenity",
        },
        description: {
            label: "Description",
            type:"textarea",
            placeholder: "Briefly describe the service/amenity",
        },
        
        

    }

    return(
        <FormWrapper>
           {LoadForm(schema, submitLabel, endpoint, "multipart/form-data")}
           
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default ServicesAndAmenitiesForm;