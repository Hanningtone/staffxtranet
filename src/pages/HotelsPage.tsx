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

import React, { useContext, useEffect, useState } from "react";
import {Context}  from '../context';

const HotelsPage = (user: any) => {

    const [showModal, setShowModal] = useState(false);
    const [catData, setCatData] = useState();
    const [token, setToken] = useState();

    const showModalForm = (show: boolean) =>{
        setShowModal(show);
    }

    const {isLoading: isLoading, refetch: getCategories } = useQuery<any[], Error>(
        "query-hotels",
        async () => {
          return await CategoryService.getCategoriesData(token)
    },{
    enabled: false,
    onSuccess: (res: any) => { console.log(res); setCatData(res)}})

    useEffect(()=>{
        getCategories();
    }, [catData])

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
                                            <p className="stat-title">Rooms Booked</p>
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
                                            <p className="stat-title">Fully Booked Hotels</p>
                                            <p className="stat-total">300</p>
                                        </div>
                                        <div className="stat-bottom-wrapper">
                                        <p><span className="text-danger fw-bold">-5% </span>decrease since last month</p>
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
                                    <td>Photos</td>
                                    <td>Number of rooms</td>
                                    <td>Admin Link</td>
                                    <td>Category</td>
                                    <td>Branches</td>
                                    <td>Markets</td>
                                    <td>Manager(s)</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </thead>

                            {isLoading?
                                <TableLoaders count={10}/>
                            :
                                <tbody>
                                    <tr>
                                        <td>The social house</td>
                                        <td><span>90</span></td>
                                        <td>
                                            <div className="position-relative">
                                                <img src={Poster} className='photo1'/>
                                                <img src={Poster} className='photo2'/>
                                                <span className='photos-number'>&nbsp; +5</span>
                                            </div>
                                        </td>
                                        <td><span className="default">20</span></td>
                                        <td><a href="#">socialhouse.uncover.com</a></td>
                                        <td><span className="category">Luxury</span></td>
                                        <td><span className="default">1</span></td>
                                        <td><span className="default">Markets</span></td>
                                        <td><Avatar color={'orange'} round={true} name="Wim Mostmans" size="25" /> +4</td>
                                        <td><a href="/hotel-profile" className="more" title="View more"><i className="fa fa-ellipsis-h"></i></a></td>
                                    </tr>
                                    <tr>
                                        <td>The social house</td>
                                        <td><span>90</span></td>
                                        <td>
                                            <div className="position-relative">
                                                <img src={Poster} className='photo1'/>
                                                <img src={Poster} className='photo2'/>
                                                <span className='photos-number'>&nbsp; +5</span>
                                            </div>
                                        </td>
                                        <td><span className="default">20</span></td>
                                        <td><a href="#">socialhouse.uncover.com</a></td>
                                        <td><span className="category">Luxury</span></td>
                                        <td><span className="default">1</span></td>
                                        <td><span className="default">Markets</span></td>
                                        <td><Avatar color={'orange'} round={true} name="Wim Mostmans" size="25" /> +4</td>
                                        <td><a href="/hotel-profile" className="more" title="View more"><i className="fa fa-ellipsis-h"></i></a></td>
                                    </tr>
                                    <tr>
                                        <td>The social house</td>
                                        <td><span>90</span></td>
                                        <td>
                                            <div className="position-relative">
                                                <img src={Poster} className='photo1'/>
                                                <img src={Poster} className='photo2'/>
                                                <span className='photos-number'>&nbsp; +5</span>
                                            </div>
                                        </td>
                                        <td><span className="default">20</span></td>
                                        <td><a href="#">socialhouse.uncover.com</a></td>
                                        <td><span className="category">Luxury</span></td>
                                        <td><span className="default">1</span></td>
                                        <td><span className="default">Markets</span></td>
                                        <td><Avatar color={'orange'} round={true} name="Wim Mostmans" size="25" /> +4</td>
                                        <td><a href="/hotel-profile" className="more" title="View more"><i className="fa fa-ellipsis-h"></i></a></td>
                                    </tr>
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