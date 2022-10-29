import React, { useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {LoadForm } from "../../utils/form";
import {useNavigate} from 'react-router-dom';

interface Props {
    setShowModal: any
}

const HotelPhotoForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const submitLabel = "Add Photos";
    const endpoint = '/business-photos/upload';
    const { id } = useParams();
    
    const schema = {
       url_path: {
            label: "Click To Add",
            type:"multiplefileupload",
            accept:"image/*"
        },
        
         business_id: {
            value: id,
            type:"hidden",
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
export default HotelPhotoForm;