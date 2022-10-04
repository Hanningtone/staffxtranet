import styled from "styled-components";
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

const PromosPage = (user: any) => {

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
             pageTitle="Promos"
             pageSubTitle="Referal Codes and Promotions"
             btnTxt = "Create new Promo"
             onPress = {()=>showModalForm(!showModal)}
             showCreateButton = {true}
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                    <div className="row px-3">
                        <div className="col-lg-12 bg-white">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Promo Name</td>
                                        <td>Promo Type</td>
                                        <td>Amount Discounted</td>
                                        <td>Percentage Discounted</td>
                                        <td>Start date</td>
                                        <td>End Date</td>
                                        <td>#</td>
                                    </tr>
                                </thead>

                                {isLoading?
                                    <TableLoaders count={7}/>
                                :
                                    <tbody>
                                        <tr>
                                            <td>The social house</td>
                                            <td>Referal Code</td>
                                            <td><span className="default">500</span></td>
                                            <td><span className="default">5%</span></td>
                                            <td>May 10, 2022 10am</td>
                                            <td>May 10, 2022 10pm</td>
                                            <td><span className="default">1</span></td>
                                        </tr>
                                        <tr>
                                            <td>CODE8</td>
                                            <td>Promo code</td>
                                            <td><span className="default">500</span></td>
                                            <td><span className="default">5%</span></td>
                                            <td>May 10, 2022 10am</td>
                                            <td>May 10, 2022 10pm</td>
                                            <td><span className="default">1</span></td>
                                        </tr>
                                        <tr>
                                            <td>Georate</td>
                                            <td>Promotions</td>
                                            <td><span className="default">500</span></td>
                                            <td><span className="default">5%</span></td>
                                            <td>May 10, 2022 10am</td>
                                            <td>May 10, 2022 10pm</td>
                                            <td><span className="default">1</span></td>
                                        </tr>
                                    </tbody>
                                }
                            </table>
                        </div>
                        <p className="text-end mt-3 pagination-text">Showing page 1 of 1</p>
                    </div>
                    </div>
                    <div className="col-lg-4">
                        <Sidebar>
                                <div className="field-wrapper">
                                    <div>
                                            <span>Nairobi</span>
                                    </div>
                                    <div className="btnwrapper">
                                            <button>Edit</button>
                                            <button>Delete</button>
                                    </div>
                                </div>
                                <hr className="firstchild" />
                                <div className="field-wrapper">
                                    <span>Market Name:</span>
                                    <span>Nairobi</span>
                                </div>
                                <hr  />
                                <div className="field-wrapper">
                                    <span>Country:</span>
                                    <span>Kenya</span>
                                </div>
                                <hr />
                                <div className="field-wrapper">
                                    <span>City:</span>
                                    <span >Nairobi</span>
                                </div>
                               
                            </Sidebar>
                            <Sidebar>
                               <div className="field-wrapper">
                                    <div>
                                        <span><strong>Promo Code Activities</strong></span>
                                    </div>
                                </div>
                            </Sidebar>
                    </div>
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

    const Sidebar = styled.div`
    width:100%;
    border:1px solid #f1f1f1;
    background-color:#fff;
    padding:10px;
    margin-bottom:20px;
    .field-wrapper{
        display:flex;
        justify-content:space-between;
        align-items:center;
        .btnwrapper button{
            border:none;
            outline:none;
            margin-left:20px;
            padding:3px 7px;
        }
        span{
            font-size:.75rem
        }
        .color{
            background-color:orange;
            padding:3px 7px;
            border-radius:5px;
            text-align:center;
        }
    }
    hr{
        background-color:#ccc;
    }
    hr.firstchild{
        background-color:#666
    }`

export default PromosPage;