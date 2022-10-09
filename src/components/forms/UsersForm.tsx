import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';

interface Props {
    setShowModal: any
}

const UsersForm = (props: Props) => {

    const schema = {
        business_id : {
            type: 'db_select',
            label : 'Business / Hotel',
            model : 'business',
            model_display_col : ['name'],
            placeholder : 'Select Busines or Hotel ',
            required : true
         },
         first_name : {
            type: 'text',
            label : 'First name ',
            placeholder : 'Enter First Name',
            required : true
         },
         last_name : {
            type: 'text',
            label : 'Last name ',
            placeholder : 'Enter Last Name',
            required : true
         },
         username : {
            type: 'text',
            label : 'Username ',
            placeholder : 'Enter username ',
            required : true
         },
         phone_number : {
            type: 'text',
            label : 'Phone Number',
            placeholder : 'Enter Phone number',
            required : true
         },
         email : {
            type: 'email',
            label : 'Email Address',
            placeholder : 'Enter Email Address',
            required : true
         },
         password : {
             type : 'password',
             label : 'Password',
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
    const [label, setLabel] = useState("Create User");  
    const [endpoint, setEndpoint] = useState("/auth/register");
 
    return(
        <FormWrapper>
            { LoadForm(schema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default UsersForm;
