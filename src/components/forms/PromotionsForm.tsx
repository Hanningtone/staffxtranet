import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { LoadForm } from '../../utils/form';

interface Props {
    setShowModal: any
}

const PromtionsForm = (props: Props) => {
    const { promotion, label } = props;

    const schema = {
        
         title : {
            type: 'text',
            label : 'Promo Title ',
            value: promotion?.title,
            placeholder : 'Write short title',
            required : true
         },
         narration : {
            type: 'text',
            label : ' Promo Description ',
            value: promotion?.narration,
            placeholder : 'Write Short Description',
            required : true
         },
         amount_discounted : {
            type: 'text',
            label : 'Maximum Discount Limit',
            value: promotion?.amount_discounted,
            placeholder : 'Enter Amount to Discount ',
            required : true
         },
         percentage_discount : {
            type: 'text',
            label : 'Percentage to Discount',
            value: promotion?.percentage_discount,
            placeholder : 'Enter peercentage to discount',
            required : true
         },
         start_date: {
            type: 'datetime',
            label : 'Start Date',
            value: promotion?.start_date,
            placeholder : 'Enter date to start the Promo',
            required : false
         },
         end_date: {
            type: 'datetime',
            label : 'End Date',
            value: promotion?.end_date,
            placeholder : 'Ente date to end the Promo',
            required : false
         }


    }
    const [endpoint, setEndpoint] = useState("/promotions/create");

    useEffect(() => {
        if(promotion) {
           setEndpoint(`/promotions/update/${promotion.id}`);
        }
        else {
            setEndpoint(`/promotions/create/`);
        }
    }, [promotion]);
 
    return(
        <FormWrapper>
            { LoadForm(schema, label, endpoint) }
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
`
export default PromtionsForm;
