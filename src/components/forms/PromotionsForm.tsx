import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';

interface Props {
    setShowModal: any
}

const PromtionsForm = (props: Props) => {

    const schema = {
        room_type_id : {
            type: 'db_select',
            label : 'Room Type',
            model : 'room-types',
            model_display_col : ['title'],
            placeholder : 'Select Busines or Hotel ',
            required : true
         },
         title : {
            type: 'text',
            label : 'Promo Title ',
            placeholder : 'Write short title',
            required : true
         },
         narration : {
            type: 'text',
            label : ' Promo Description ',
            placeholder : 'Write Short Description',
            required : true
         },
         amount_discounted : {
            type: 'text',
            label : 'Amount to Discount ',
            placeholder : 'Enter Amount to Discount ',
            required : true
         },
         percentage_discount : {
            type: 'text',
            label : 'Percentage to Discount',
            placeholder : 'Enter peercentage to discount',
            required : true
         },
         start_date: {
            type: 'datetime',
            label : 'Start Date',
            placeholder : 'Enter date to start the Promo',

            required : false
         },
         end_date: {
            type: 'datetime',
            label : 'End Date',
            placeholder : 'Ente date to end the Promo',
            required : false
         }


    }
    const [label, setLabel] = useState("Create Promotion");  
    const [endpoint, setEndpoint] = useState("/promotions/create");
 
    return(
        <FormWrapper>
            { LoadForm(schema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default PromtionsForm;
