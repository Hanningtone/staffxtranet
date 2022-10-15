import styled from "styled-components";
import { AdminLayout, LineChart, BookingSummary} from "../components";
import React, { useContext, useEffect, useState, useCallback } from "react";
import {Context}  from '../context';
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import makeRequest from "../utils/fetch-request";
import { GrView } from 'react-icons/gr';


const HomePage = (user: any) => {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "App Loads",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Bookings",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774"
          }
        ]
    };
    const [ bookings, setBookings] = useState([]);
    
    const fetchBookings = useCallback(() => {
        let endpoint = "/bookings/get"
        makeRequest({url:endpoint, method:"get",data:null}).then(([status, result]) => {
            if(status == 200){
                setBookings(result?.data);
                console.log("We got some Data", result?.data);
            }
        })
    
    }, []);

    useEffect(() =>{

        fetchBookings();
   
   }, [fetchBookings])

    return(
        <AdminLayout showSideMenu={true} user={user}>
        <Home>
            <div className="container-fluid py-5 px-4">
                <div className="row">
                    <div className="col-lg-3">
                       <div className="home-stat-wrapper">
                           <div className="stat-icon">
                               <i className="fa fa-bed"></i>
                           </div>
                           <div className="stat-top-wrapper">
                                <p className="stat-title">Total Hotels</p>
                                <p className="stat-total">300</p>
                           </div>
                           <div className="stat-bottom-wrapper">
                               <p><span className="text-success fw-bold">+5% </span>increase since last month</p>
                           </div>
                       </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="home-stat-wrapper">
                            <div className="stat-icon">
                               <i className="fa fa-bed"></i>
                            </div>
                            <div className="stat-top-wrapper">
                                <p className="stat-title">Rooms Available</p>
                                <p className="stat-total">3000</p>
                           </div>
                           <div className="stat-bottom-wrapper">
                               <p><span className="text-danger fw-bold">-5% </span>decrease since last month</p>
                           </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="home-stat-wrapper">
                            <div className="stat-icon">
                               <i className="fa fa-users"></i>
                           </div>
                            <div className="stat-top-wrapper">
                                <p className="stat-title">Total Customers</p>
                                <p className="stat-total">300</p>
                            </div>
                            <div className="stat-bottom-wrapper">
                               <p><span className="text-success fw-bold">+5% </span>increase since last month</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="home-stat-wrapper">
                            <div className="stat-icon">
                               <i className="fa fa-calendar"></i>
                           </div> 
                            <div className="stat-top-wrapper">
                                <p className="stat-title">Total Bookings</p>
                                <p className="stat-total">{ bookings.length }</p>
                            </div>
                            <div className="stat-bottom-wrapper">
                               <p><span className="text-danger fw-bold">-5% </span>decrease since last month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid pb-5 px-4">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="graph-containers">
                           <LineChart data={data}/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="graph-containers">
                             <div className="row p-4">
                                 <div className="col-lg-12">
                                    <h6 className="mb-3 fs-6">Bookings and Booking Requests</h6>
                                    <div className="bookings">
                                       <BookingSummary/>
                                    </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid px-4 pb-5">
                <div className="row">
                    <div className="col-lg-3">
                       <div className="home-stat-wrapper">
                           <div className="stat-top-wrapper">
                                <p className="stat-title">Avg Conversion Rate(%)</p>
                                <p className="stat-total">300</p>
                            </div>
                       </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="home-stat-wrapper">
                            <div className="stat-top-wrapper">
                                <p className="stat-title">Avg Discount (%)</p>
                                <p className="stat-total">300</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="home-stat-wrapper">
                            <div className="stat-top-wrapper">
                                <p className="stat-title">Avg Booked Rate </p>
                                <p className="stat-total">300</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="home-stat-wrapper">
                           <div className="stat-top-wrapper">
                                <p className="stat-title">Avg Length of Stay</p>
                                <p className="stat-total">300</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Home>
        </AdminLayout>
    )

}

const Home = styled.div`
    width: 100%;
    height: auto; 
    .graph-containers{
        background-color: #fff;
        height:460px;
        width:100%;
    }
    `

export default HomePage;
