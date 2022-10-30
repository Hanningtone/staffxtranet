import React, { useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {LoadForm } from "../../utils/form";
import {useNavigate} from 'react-router-dom';

interface Props {
    setShowModal: any
}

const PerkForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const submitLabel = "Create Perk";
    const endpoint = '/room-perks/create';
    const { id } = useParams();
    
    const schema = {
       name: {
            label: "Name",
            type:"text",
            placeholder:"Enter Name",
        },
        
         business_id: {
            value: id,
            type:"hidden",
        },
        description: {
            label: "Description",
            type:"textarea",
            placeholder: "Describe Your Perk",
        },
        start_date: {
            label: "Click To Pick Start Date",
            type:"datetime",
            placeholder:"Pick Start Date",
        },

        End_date: {
            label: "Click To Pick End Date",
            type:"datetime",
            placeholder:"Pick End Date",
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
export default PerkForm;