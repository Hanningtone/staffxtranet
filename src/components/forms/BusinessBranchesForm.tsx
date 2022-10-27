import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from '../../context';

interface Props {
    setShowModal: any
    submitTitle : any
}

const BusinessBranchesForm = (props : Props) => {
    const [state, dispach] = useContext(Context);
    const { submitTitle } = props;

    const schema = {
        business_id : {
            type: 'db_select',
            label : 'Select Hotel or Business',
            model : 'business',
            model_display_col : ['name'],
            placeholder : 'Select Busines or Hotel ',
            required : true
         },
         main_branch : {
            type: 'select',
            label : ' Main Branch? ',
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
            placeholder : ' Short Description of the Hotel',
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