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
 import { useEffect, useCallback, useState, useContext  } from 'react';
 import makeRequest from "../utils/fetch-request";
 import { Context } from "../context";
 import { confirm } from "react-confirm-box";



const MarketsPage = (user: any) => {
    const [markets, setMarkets] = useState<any>([]);
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [state, dispatch ] =  useContext(Context);
    const [selectedMkt, setSelectedMkt] = useState<any>();

    const [showModal, setShowModal] = useState(false);
    const [catData, setCatData] = useState();
    const [token, setToken] = useState();

    const deactivateRecord = async (rule:any, endpoint: any) => {
        const options = {
          labels: {
            confirmable: "Deactivate",
            cancellable: "Cancel"
          },
          classNames: {confirmButton: "btn btn-danger", cancelButton:"btn btn-warning"}
        }

       const confirmed = await confirm("You are about to Deactvate this record,?", options);
       if (confirmed) {

          let _url = endpoint+ rule.id;

          makeRequest({ url: _url, method: "update", data: {status:"deactivated"} }).then(
            ([status, result]) => {
              if (status !== 204) {
                dispatch({type:"SET", key:"page", payload: state?.page === 1? 0 : 1});
              } else {
                setError(result?.message || "Error, failed to update record");
              }
            }
          );
       }
       console.log("You click No!");
    }
    const implementDelete = (record:any, endpoint : any) => {
        deleteRecord(record, endpoint);
    }

    const showModalForm = (show: boolean) =>{
        setShowModal(show);
    }

    const editSelectedMkt = () => {
        showModalForm(!showModal);
    }

    useEffect(() => {
        if(selectedMkt) {
           showModalForm(!showModal);
        }
    }, [selectedMkt]);

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

    const fetchMarkets = () => {
        let _url = "/market/get";
    
        makeRequest({ url: _url, method: "get", data: null }).then(
          ([status, result]) => {
            if (status !== 200) {
              setError(result?.message || "Error, could not fetch records");
            } else {
              setMarkets(result?.data || []);
            }
          }
        );
      };

    
    useEffect(() => {
        dispatch({type:"SET", key:'context', payload:'marketspage'});
        fetchMarkets();
    }, [])

    useEffect(() => {
        fetchMarkets();
    }, [state?.page])

    return(
        <AdminLayout showSideMenu={true} user={user}>
        <Home>
            <SubHeader
             pageTitle="Markets"
             pageSubTitle={<div style={{backgroundColor:"#0d6efd", color:"white", borderRadius:"50%", width: "30px",height:"30px",textAlign:"center",lineHeight:"30px"}}>{markets?.length}</div>}
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
                            <thead className="thead-light green">
                                <tr>
                                    <td>Market Name</td>
                                    <td>Country</td>
                                    <td>City</td>
                                    <td>Total Hotels</td>
                                    <td>Rooms</td>
                                    <td>Bookings</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>

                               { markets && markets?.map((market:any) => {  
                                    return (
                                        <tr>
                                            <td>{market.market_name}</td>
                                            <td>{market.country}</td>
                                            <td>{market.city}</td>
                                            <td><span className="default">{market?.hotels || 0}</span></td>
                                            <td><span className="default">{market?.rooms || 0}</span></td>
                                            <td><span className="default">{market?.bookings || 0}</span></td>
                                            <td><span className="default">
                                                <span style={{float:"left"}} onClick ={ () => setSelectedMkt(market)}>
                                                    <i className="fa fa-edit"></i>
                                              </span>

                                              {/* <span style={{float:"right"}} onClick={() => implementDelete(market, '/market/delete/')}>
                                                <i className="fa fa-trash" style={{color:"red"}}></i>
                                            </span> */}
                                            </span></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg-4">
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
                <MarketsForm setShowModal={setShowModal} market={selectedMkt}/>
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
