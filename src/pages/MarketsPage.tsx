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



const MarketsPage = (user: any) => {
    const [markets, setMarkets] = useState<any>([]);
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [state, dispatch ] =  useContext(Context);
    const [selectedMkt, setSelectedMkt] = useState<any>();

    const [showModal, setShowModal] = useState(false);
    const [catData, setCatData] = useState();
    const [token, setToken] = useState();

    const showModalForm = (show: boolean) =>{
        setShowModal(show);
    }


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

    const editSelectedMarket = () => {
        showModalForm(!showModal);
    }

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
        if(markets) {
            setSelectedMkt(markets[0]);
        }
    }, [markets])

    useEffect(() => {
        dispatch({type:"SET", key:'context', payload:'marketspage'});
        fetchMarkets();
    }, [])

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
                                    <td>Country</td>
                                    <td>City</td>
                                    <td>Market Name</td>
                                    <td>Total Hotels</td>
                                    <td>Rooms</td>
                                    <td>Bookings</td>
                                </tr>
                            </thead>
                            <tbody>

                               { markets && markets?.map((market:any) => {  
                                    return (
                                        <tr onClick={() => setSelectedMkt(market)}>
                                            
                                            <td>{market.country}</td>
                                            <td>{market.city}</td>
                                            <td>{market.market_name}</td>
                                            <td><span className="default">{market?.hotels || 0}</span></td>
                                            <td><span className="default">{market?.rooms || 0}</span></td>
                                            <td><span className="default">{market?.bookings || 0}</span></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg-4">
                        {selectedMkt && (
                            <Sidebar>
                                <div className="field-wrapper">
                                    <div>
                                            <span>{selectedMkt?.market_name}</span>
                                    </div>
                                    <div className="btnwrapper">
                                            <button onClick={editSelectedMarket}>Edit</button>
                                            <button >Delete</button>
                                    </div>
                                </div>
                                <hr className="firstchild" />
                                <div className="field-wrapper">
                                    <span>County:</span>
                                    <span>{selectedMkt?.country}</span>
                                </div>
                                <hr  />
                                <div className="field-wrapper">
                                    <span>City:</span>
                                    <span>{selectedMkt?.city}</span>
                                </div>
                               
                            </Sidebar>)
                        }
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
