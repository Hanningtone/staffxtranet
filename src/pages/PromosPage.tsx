import styled from "styled-components";
import { useQuery} from 'react-query';
import { AdminLayout, 
    SubHeader,
    UncoverModal,
    HotelForm,
    TableLoaders
 } from "../components";
 import CategoryService from "../services/CategoryService";

import React, { useCallback, useContext, useEffect, useState } from "react";
import {Context}  from '../context';
import makeRequest from "../utils/fetch-request";
import DataTable from "../utils/table";
import PromtionsForm from "../components/forms/PromotionsForm";
import CustomModalPane from "../utils/_modal";

const PromosPage = (user: any) => {

    const [showModal, setShowModal] = useState(false);
    const [catData, setCatData] = useState();
    const [token, setToken] = useState();
    const [promotions, setPromotions] = useState([]);
    const [state, dispatch ] =  useContext(Context);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState();
    const [classname, setClassname] = useState('success');



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
    
      }, [state?.promotionspage])

  
   const fetchPromotions = useCallback( () => {
    let endpoint = '/promotions/get';

    makeRequest( { url :endpoint, method:"get" , data:null}).then( ([status, result]) => {
        if(status !== 200) {
            setError(result?.message || "Error, could not fetch records");
        }
        else {
            console.log("We got data here!", result?.data) 
            setPromotions(result?.data || []);
                    

        }
     } );
   }, [state?.promotionspage])


    useEffect(()=>{
        fetchPromotions();
    }, [fetchPromotions])

    const showModalForm = (show: boolean) =>{
        setShowModal(show);
    }
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
          <div className="row pe-1">
              <div className="col-lg-6">

                  <DataTable data = {promotions }/>
              </div>
              <div className="col-lg-4">
                        <Sidebar>
                                <div className="field-wrapper">
                                    <div>
                                            <span className="h4">Your Profile</span>
                                    </div>
                                    <div className="btnwrapper">
                                            <button>Change Details</button>
                                    </div>
                                </div>
                                <hr className="firstchild" />
                                <div className="field-wrapper">
                                    <span className="h5">Name: </span>
                                    <span>{user?.first_name} &nbsp; {user?.last_name}</span>
                                </div>
                                <hr  />
                                <div className="field-wrapper">
                                    <span className="h5">Email : </span>
                                    <span> { user?.email } </span>
                                </div>
                                <hr />
                                <div className="field-wrapper">
                                    <span className="h5">Phone Number : </span>
                                    <span > { user?.phone_number } </span>
                                </div>
                               
                            </Sidebar>
                            <Sidebar>
                               <div className="field-wrapper">
                                    <div>
                                        <span><strong>My Businesses </strong></span>

                                    </div>
                                </div>

                                <hr className="firstchild" />

                                
                            </Sidebar>
                    </div>
          </div>
        </div>

        <CustomModalPane
                show={showModal}
                title=" Create Promotion"
                target="create-user"
                hideThisModal={() => setShowModal(false)}
              >
                {message && <div className={classname}>{message}</div>}
                <PromtionsForm setShowModal={showModal} />
              </CustomModalPane>
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