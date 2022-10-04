import styled from "styled-components";
import { useQuery} from 'react-query';
import { AdminLayout, 
    SubHeader,
    UncoverModal,
    MarketsForm,
    TableLoaders,
    LineChart
 } from "../components";
 import CategoryService from "../services/CategoryService";
 import SettingsMenu from "../components/settings/SettingsMenu";

import React, { useContext, useEffect, useState } from "react";

const MarketsPage = (user: any) => {

    const [showModal, setShowModal] = useState(false);
    const [catData, setCatData] = useState();
    const [token, setToken] = useState();

    const showModalForm = (show: boolean) =>{
        setShowModal(show);
    }

    const {isLoading: isLoading, refetch: getCategories } = useQuery<any[], Error>(
        "query-categories",
        async () => {
          return await CategoryService.getCategoriesData(token)
    },{
    enabled: false,
    onSuccess: (res: any) => { console.log(res); setCatData(res)}})

    useEffect(()=>{
        getCategories();
    }, [catData])

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

    return(
        <AdminLayout showSideMenu={true} user={user}>
        <Home>
            <SubHeader
             pageTitle="Markets"
             pageSubTitle="200 hotel on Uncover"
             btnTxt="Create new market"
             onPress = {()=>showModalForm(!showModal)}
             showCreateButton = {true}
            />
            <div className="container-fluid">
                <div className="row pe-3">
                    <div className="col-lg-2">
                        <SettingsMenu />
                    </div>
                    <div className="col-lg-6">
                        <table>
                            <thead>
                                <tr>
                                    <td>Market Name</td>
                                    <td>Country</td>
                                    <td>City</td>
                                    <td>Total Hotels</td>
                                    <td>Rooms</td>
                                    <td>Bookings</td>
                                </tr>
                            </thead>
                            <tbody>

                                {isLoading?
                                <TableLoaders count={6}/>
                                :
                                <tr>
                                    <td>Naivasha</td>
                                    <td>Kenya</td>
                                    <td>Nairobi</td>
                                    <td><span className="default">0</span></td>
                                    <td><span className="default">0</span></td>
                                    <td><span className="default">0</span></td>
                                </tr>
                                }

                            </tbody>
                        </table>
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
                                        <span><strong>Markets Activities</strong></span>
                                    </div>
                                </div>
                                <LineChart data={data}/>
                            </Sidebar>
                    </div>
                </div>
            </div>
            <UncoverModal show={showModal}>
                <MarketsForm setShowModal={setShowModal}/>
            </UncoverModal>
        </Home>
        </AdminLayout>
    )
}

const Home = styled.div`
    width: 100%;
    height: auto;
    .bg-c{
        padding:10px;
    }
    .bg-white{
        background-color:#fff;
        padding:10px;
        border:1px solid #ccc;
    }
    .col-lg-8,.col-lg-4{
        padding:0px;
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
    }
`
export default MarketsPage;
