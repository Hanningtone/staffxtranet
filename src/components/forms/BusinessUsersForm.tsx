import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from '../../context';

interface Props {
    setShowModal: any
    submitTitle : any
}

const BusinessUsersForm = (props : Props) => {
    const [state, dispach] = useContext(Context);
    const { submitTitle } = props;

    const schema = {
        user_id : {
            type: 'db_select',
            label : 'Select Hotel on Magniva',
            model : 'business',
            model_display_col : ['name'],
            placeholder : 'Select Busines or Hotel ',
            required : true
         },
         business_id : {
            type: 'db_select',
            label : ' Choose User From List',
            model : 'users',
            model_display_col : ['username'],
            placeholder : 'Select Hotel to Add a Manager ',
            required : true
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