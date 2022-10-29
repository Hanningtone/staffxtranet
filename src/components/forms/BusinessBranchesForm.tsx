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

const BusinessBranchesForm = (props : Props) => {
    const [state, dispach] = useContext(Context);
    const { submitTitle } = props;
    const { id } = useParams();

    const schema = {
        business_id : {
            type : 'hidden',
            value : id,
         },
         main_branch : {
            type: 'select',
            label : ' Is it a Main Branch? ',
            options : [
                {value:1, label:'YES'},
                {value:0, label:'NO'}
            ],
            placeholder : 'Is it the main Branch? ',
            required : true
         },
         branch_name : {
            type: 'text',
            label : ' Name ',
            placeholder : 'Enter name of the branch',
            required : true
         },
         description : {
            type: 'textarea',
            label : ' Description',
            placeholder : ' Short Description of the Hotel Branch',
            required : true,
         }

    }
      
    const [usersFormSchema, setUsersFormSchema] = useState(schema);
    const [label, setLabel] = useState("Create Branch");  
    const [endpoint, setEndpoint] = useState("/business-branch/create");
 
    return(
        <FormWrapper>
            { LoadForm(usersFormSchema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default BusinessBranchesForm;