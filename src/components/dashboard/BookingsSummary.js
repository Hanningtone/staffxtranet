import styled from "styled-components";
import React, { useContext, useEffect, useState, useCallback } from "react";
import makeRequest from "../../utils/fetch-request";
import { Context } from "../../context";
import DataTable from "../../utils/table";



const BookingSummary= (props) => {
    const [bookings, setBookings] = useState();
    const [error, setError] = useState(null);
    const [state, dispatch] = useState(Context);

    const fetchBookings = useCallback( () => {
        let endpoint = '/booking-summary/get';
    
        makeRequest( { url :endpoint, method:"get" , data:null}).then( ([status, result]) => {
            if(status !== 200) {
                setError(result?.message || "Error, could not fetch records");
            }
            else {
                console.log("We got data here!", result?.data)
                setBookings(result?.data)
                console.log("Hey Boss, we got bookings", bookings)
            }
         } );
       }, [])
    
    
        useEffect(()=>{
            fetchBookings();
        }, [fetchBookings])

    return(
        <Booking>
            
            <div className="no-bookings">
             <DataTable data = { bookings } />
            </div>
        </Booking>
    )
}

const Booking = styled.div`
    width: 100%;
    height: auto;    
    .no-bookings{
        background-color: #fff;
        border:1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow : scroll;
    }`

export default BookingSummary;
