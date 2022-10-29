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

const BusinessUsersForm = (props : Props) => {
    const [state, dispach] = useContext(Context);
    const { submitTitle } = props;
    const { id } = useParams();

    const schema = {
        user_id : {
            type: 'db_select',
            label : 'Select User on Uncover',
            model : 'users',
            model_display_col : ['username'],
            placeholder : 'Select Busines or Hotel ',
            required : true
         },
         business_id : {
            type: 'hidden',
            value : id,
         },

    }
      
    const [usersFormSchema, setUsersFormSchema] = useState(schema);
    const [label, setLabel] = useState(" Add Manager ");  
    const [endpoint, setEndpoint] = useState("/user-business-access/create");
 
    return(
        <FormWrapper>
            { LoadForm(usersFormSchema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default BusinessUsersForm;