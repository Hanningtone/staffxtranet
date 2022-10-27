import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from '../../context';

interface Props {
    setShowModal: any
    submitTitle : any
}

const HouseRulesForm = (props : Props) => {
    const [state, dispach] = useContext(Context);
    const { submitTitle } = props;

    const schema = {
        business_id : {
            type: 'db_select',
            label : 'Business / Hotel',
            model : 'business',
            model_display_col : ['name'],
            placeholder : 'Select Busines or Hotel ',
            required : true
         },
         narration : {
            type: 'text',
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