import React, { useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {LoadForm } from "../../utils/form";
import {useNavigate} from 'react-router-dom';

interface Props {
    setShowModal: any
}

const LoveForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const submitLabel = "Create Narration";
    const endpoint = '/whyweloveit/create';
    const { id } = useParams();
    
    const schema = {
        business_id: {
            value: id,
            type:"hidden",
        },
        narration: {
            label: "Narration",
            type:"textarea",
            placeholder: "Briefly narrate why we we love it",
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
export default LoveForm;