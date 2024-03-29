import styled from "styled-components";
import Poster from "../assets/images/cover_photo.jpg";
import Avatar from 'react-avatar';
import { useQuery} from 'react-query';
import { AdminLayout, 
    SubHeader,
    UncoverModal,
    HotelForm,
    TableLoaders
 } from "../components";
 import CategoryService from "../services/CategoryService";

import React, { useContext, useEffect, useState, useCallback } from "react";
import {Context}  from '../context';
import makeRequest from "../utils/fetch-request";
import { useNavigate } from 'react-router-dom';
import { GrView } from 'react-icons/gr';

const HotelsPage = (user: any) => {

    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState();
    const [state, dispatch] = useContext<any>(Context);
    const [clasname, setClassname] = useState('success');
    const [message, setMessage] = useState();
    const [modalTitle, setModalTitle] = useState(" Create Hotel");
    const [submitTitle, setSubmitTitle] = useState(" Create a Hotel");
    const [selectedrecord, setSelectedRecord] = useState(null);
    const [error, setError] = useState(null);
    const [hotels, setHotels] = useState<any>([]);
    const [extras, setExtras] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        dispatch({type:"SET", key:'context', payload:'eventspage'});
    }, [])
  
    useEffect(() => {
      if(state?.context){
        let status = state[state.context]?.status;
        let message = state[state.context]?.message;
        let data = state[state.context]?.data || {};
  
        if(status === true){
          setClassname('alert alert-success');     
        } else {
          setClassname('alert alert-danger');
        }
        setMessage(message);
      }
  
    }, [state?.eventspage])
  
  
    const showModalForm = (show : any, 
      title='Create Event', 
      submitTitle='Create Record') =>{
      setModalTitle(title);
      setSubmitTitle(submitTitle);
      setShowModal(show);
    }
  
    useEffect(()=> {
      if(!showModal) {
        setSelectedRecord(null);
      }
  
    }, [showModal])
  
    const fetchEvents = () => {
      let _url = "/business/get?append=booking-page-stat";
  
      makeRequest({ url: _url, method: "get", data: null }).then(
        ([status, result]) => {
          if (status !== 200) {
            setError(result?.message || "Error, could not fetch records");
          } else {
            setHotels(result?.data || []);   
            console.log("My extras ", result?.extra)
            setExtras(result?.extra);       
     
          }
        }
      );
      
    }
    
    useEffect(() => {
      
      if(state?.updaterecord){
          let id = state.updaterecord.id;
          let model = state.updaterecord.model;
          let data_url = '/'+model+'/get?id=' + id;
          makeRequest({url:data_url, method:'get', data:null}).then(([status, response])=> {
              if(status !== 200){
                  dispatch({type:'SET', key:'server_error', payload:response.message})
  
              } else {
                  setSelectedRecord(response.data.shift());
              }
              setModalTitle('Update Event Details');
              setShowModal(true);
          })
      }
  },[state?.updaterecord])
  
    useEffect(() => {
      fetchEvents();
    }, []);

     useEffect(() => {
      fetchEvents();
    }, [state?.page]);
    
    const navigateToConfirmed= (eachHotel : any) =>{
        navigate(`/hotel-profile/${eachHotel.id}`, { state: eachHotel}); // here we will redirect user and send your data into state
     }

const hotelOnclickHandler = (props : any) => {


} 
    // <a href="/hotel-profile" className="more" title="View more"><i className="fa fa-ellipsis-h"></i>

    return(
        <AdminLayout showSideMenu={true}  user={user}>
        <Home>
            <SubHeader
             pageTitle="Hotels"
             pageSubTitle="200 hotel on Uncovers"
             btnTxt = "Create new hotel"
             onPress = {()=>showModalForm(!showModal)}
             showCreateButton = {true}
            />
            <div className="container-fluid">

                <div className="row px-3">
                    <div className="col-lg-12">
                        <div className="stats-wrapper">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                            <i className="fa fa-bed"></i>
                                        </div>
                                        <div className="stat-top-wrapper">
                                                <p className="stat-title">Total Hotels</p>
                                                <p className="stat-total">{hotels?.length}</p>
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
                                            <p className="stat-total">{ extras && extras?.["booking-page-stat"][0].rooms}</p>
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
                                            <p className="stat-title">Rooms Booked Today</p>
                                            <p className="stat-total">{  extras && extras?.["booking-page-stat"][0].rooms_booked}</p>
                                        </div>
                                        <div className="stat-bottom-wrapper">
                                        <p><span className="text-success fw-bold"> </span> These are rooms booked today</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                        <i className="fa fa-calendar"></i>
                                    </div> 
                                        <div className="stat-top-wrapper">
                                            <p className="stat-title">Fully Booked Hotels</p>
                                            <p className="stat-total">{ extras && extras?.["booking-page-stat"][0].fully_booked_hotels}</p>
                                        </div>
                                        <div className="stat-bottom-wrapper">
                                        <p><span className="text-danger fw-bold">-5% </span>By today, these are the fully bo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 bg-white">
                        <table>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Total Bookings</td>
                                    <td>No of available rooms</td>
                                    <td>Admin Link</td>
                                    <td>Category</td>
                                    <td>No. of Branches</td>
                                    <td>Markets</td>
                                    <td>Manager(s)</td>
                                    <td> View Detail &nbsp;</td>
                                </tr>
                            </thead>

                            {isLoading?
                                <TableLoaders count={10}/>
                            :
                                <tbody>
                                    { hotels?.map((eachHotel:any) => {
                                    return ( <>
                                    <tr>
                                   
                                        <td> {eachHotel.name} </td>
                                        <td><span> {eachHotel.total_hotels || " No Data for this field"}</span></td>
                                        <td><span className="default">{eachHotel.available_rooms || 0}</span></td>
                                        <td> { eachHotel.admin_link ? <a href="#"> {eachHotel.admin_link} </a> : " No Admin Link !!"} </td>
                                        <td><span className="category">{eachHotel.category || " Unidentified "}</span></td>
                                        <td><span className="default"> {eachHotel.branches.length || " No Hotel Branches"} </span></td>
                                        <td><span className="default"> {eachHotel.market.market_name} </span></td>
                                        <td><Avatar color={'orange'} round={true} name=" Hans Miller" size="25" /> {eachHotel.admin_users.length || " No Admin"}</td>
                                        <td className="view_more_td"> <button className="view_detail" onClick={()=>navigateToConfirmed(eachHotel)}> ... </button></td>
                                    </tr>
                                  
                                  </>)
                                       
                                    })
                                    
                                    }
                                    
                                </tbody>
                            }


                        </table>
                    </div>
                    <p className="text-end mt-3 pagination-text">Showing page 1 of 1</p>
                </div>
            </div>
            <UncoverModal show={showModal}>
                <HotelForm setShowModal={setShowModal}/>
            </UncoverModal>
        </Home>
        </AdminLayout>
    )
}

const Home = styled.div`
    width: 100%;
    height: auto;
    .bg-white{
        background-color: #fff;
    }
    .col-lg-12{
       padding:0px;
    }
    .stats-wrapper{
        height:auto;
        margin:20px 0px;
    }
    .view_more_td {
        align-content: center;

    }
    .view_detail {
        margin-left : 10px;
        border:none;
        outline:none;
        padding:3px 7px;
        background-color: #fff;
        letter-spacing : 0.6em;
        font-weight : 900;
        position : center;
        border-radius: 15px 15px;
      }
    .photo1{
        width:30px;
        height:30px;
        border-radius:5px;
        margin-top:5px;
    }
    .photo2{
        width:30px;
        height:30px;
        border-radius:5px;
        position: absolute;
        left:20px;
    }
    .photos-number{
        padding-left:15px;
    }
    a.more{
        paddding:5px 10px;
        margin-top:10px;
        display: block;
        border: 1px solid #f1f1f1;
        text-align: center
    }
    a.more: hover{
        background-color: blue;
        color: white;
    }
    .pagination-text{
        font-size:12px;
    }

    `

export default HotelsPage;
