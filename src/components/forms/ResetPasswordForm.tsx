import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';

interface Props {
    setShowModal: any
}

const ResetPasswordForm = (props: Props) => {

    const schema = {
         email : {
            type: 'email',
            label : ' Enter Email to Reset Password',
            placeholder : 'Enter Email Address',
            required : true
         },

    }
    const [label, setLabel] = useState("Reset Password");  
    const [endpoint, setEndpoint] = useState("/auth/forgot-password");
 
    return(
        <FormWrapper>
            { LoadForm(schema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default ResetPasswordForm;
