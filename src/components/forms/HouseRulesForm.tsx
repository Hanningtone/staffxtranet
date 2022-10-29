import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from '../../context';
import { useParams } from "react-router-dom";

interface Props {
    setShowModal: any
    submitTitle : any
}

const HouseRulesForm = (props : Props) => {
    const [state, dispach] = useContext(Context);
    const { submitTitle } = props;
    const { id } = useParams();

    const schema = {
        business_id : {
            value : id,
            type : 'hidden'
         },
         narration : {  
            type: 'textarea',
            label : 'Text ',
            placeholder : 'Type the rule here',
            required : true
         },


    }
      
    const [usersFormSchema, setUsersFormSchema] = useState(schema);
    const [label, setLabel] = useState("Create House Rule");  
    const [endpoint, setEndpoint] = useState("/house-rules/create");
 
    return(
        <FormWrapper>
            { LoadForm(usersFormSchema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default HouseRulesForm;