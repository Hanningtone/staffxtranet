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
    const [selectedPromo, setSelectedPromo] = useState<any>();




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

    const editSelectedCategory = () => {
        showModalForm(!showModal);
    }

    return(
        <AdminLayout showSideMenu={true}  user={user}>
        <Home>
            <SubHeader
             pageTitle="Promos"
             pageSubTitle="Promotions"
             btnTxt = "Create new Promo"
             onPress = {()=>showModalForm(!showModal)}
             showCreateButton = {true}
            />
            <div className="container-fluid">
            <div className="row pe-1">
              <div className="col-lg-12">

                  <table>
                    <thead className="thead-light green">
                        <tr>
                            <td>Title</td>
                            <td>Narration</td>
                            <td>Amount DIscounted</td>
                            <td>% Discount</td>
                            <td>Start Date</td>
                            <td>End Date</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                            
                            {promotions && (
                                <tbody>
                                    {promotions.map((promotion:any) => {
                                     return  <tr>
                                        <td>{promotion?.title}</td>
                                        <td>{promotion?.narration}</td>
                                        <td>{promotion?.amount_discounted}</td>
                                        <td>{promotion?.percentage_discount}</td>
                                        <td>{promotion?.start_date}</td>
                                        <td>{promotion.end_date}</td>
                                        <td>
                                            <span style={{float:"left"}} onClick ={ () => setSelectedPromo(promotion)}>
                                                    <i className="fa fa-edit"></i>
                                              </span>
                                            <span style={{float:"right"}} onClick={() => implementDelete(promotion, '/promotions/delete/')}>
                                                    <i className="fa fa-trash" style={{color:"red"}}></i>
                                            </span>
                                        </td>
                                    </tr>
                                    })
                                    }
                                </tbody>
                            )
                            }

                        </table>
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