import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from '../../context';
import { getFromLocalStorage, removeItem } from '../../utils/local-storage';



interface Props {
    setShowModal: any,
    token : any
}

const ChangePasswordForm = (props : Props) => {
    const [state, dispach] = useContext(Context);


    const schema = {
         password : {
             type : 'password',
             label : 'New Password',
             placeholder : '****',
             required : true
 
         },
         password_confirmation : {
            type : 'password',
            label : 'Confirm Password',
            placeholder: '****',
            required : true

        }


    }
      
    const [usersFormSchema, setUsersFormSchema] = useState(schema);
    const [label, setLabel] = useState(" Change Password ");  
    const [endpoint, setEndpoint] = useState("/auth/change-password");
 
    return(
        <FormWrapper>
            { LoadForm(usersFormSchema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default ChangePasswordForm;