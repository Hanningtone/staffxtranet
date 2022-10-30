import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';
import { Context } from '../../context';
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';


interface Props {
    setShowModal: any
    submitTitle : any
}

const BusinessBranchesForm = (props : Props) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState();
    const submitLabel = "Create Branch";
    const endpoint = '/business-branch/create';
    const { id } = useParams();
    
    const schema = {
       business_id: {
            value: id,
            type:"hidden",
        },

        branch_name: {
            required:"required",
            label: "Branch Name",
            value: "",
            type:"text",
            placeholder:"Enter hotel Branch name"
        },
        market_id: {
            label: "Market",
            value: "",
            type:"db_select",
            model:"market",
            options:[],
            model_display_col:['market_name'],
            placeholder:"Select Market"
        },
        main_branch: {
            value: "0",
            type:"hidden"
        },
         category_id: {
            label: "Category",
            value: "",
            type:"db_select",
            model:"business-categories",
            options:[],
            model_display_col:['category_name'],
            placeholder:"Select Category"
        },
        location: {
            label: "Location",
            value: "",
            type:"places",
            placeholder:"Start typing location..."
        },
        description: {
            label : 'Description',
            type : 'textarea',
            placeholder: ' Enter Description',

        }, 
         ranking: {
            value: "0",
            type:"hidden",
        },

    }

    return(
        <FormWrapper>
        <h3 className="form-title plain">Create New Branch</h3>
           {LoadForm(schema, submitLabel, endpoint)}
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default BusinessBranchesForm;