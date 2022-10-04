import { useEffect, useCallback, useState  } from 'react';
import styled from "styled-components";
import { AdminLayout, 
    SubHeader,UsersList
 } from "../components";

import makeRequest from "../utils/fetch-request";
import DataTable from "../utils/table"
import SettingsMenu from "../components/settings/SettingsMenu";

const BusinessSettings = (props: any) => {

  const [businessSettings, setBusinessSettings] = useState([]);
  const [error, setError] = useState(null);

  const fetchBusinessSettings = useCallback(() => {
    let _url = "/business-settings/get";

    makeRequest({ url: _url, method: "get", data: null }).then(
      ([status, result]) => {
        if (status !== 200) {
          setError(result?.message || "Error, could not fetch records");
        } else {
            setBusinessSettings(result?.data || []);
        }
      }
    );
  }, []);

  useEffect(() => {
    fetchBusinessSettings();
  }, []);

    
    
    return (
        <AdminLayout showSideMenu={true}>
        <Home>
            <SubHeader
             pageTitle="Business Settings"
             pageSubTitle="Uncover settings"
             onPress = {()=>void(null)}
            />
            <div className="container-fluid">
              <div className="row px-3">
                <div className="col-lg-12">
                  <SettingsMenu />
                  <div className="booking-details bg-c">
                    <div className="booking-wrapper bg-c">
                        <DataTable data={businessSettings} /> 
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
    .bg-white{
        background-color: #fff;
        padding:10px;
    }
     .col-lg-12{
         width:100%;
         margin:auto;
         display:flex;
         justify-content:space-between;
         padding:0;
         .booking-tab{
             flex:.2;
             background-color:#fff;
             padding:30px 20px;
             position:relative;
              p{
                  cursor:pointer;
              }
             .fa {
                font-size:1.1rem;
                padding-right:20px;
             }
             a{
                 text-decoration: none;
                 color:#000;
             }
          
         }
         .booking-details{
            flex:.78;
            height:100%;
            background-color:#f1f1f1;
         }
        
     }
     .booking-container{
        margin: 20px 0px 100px 0px;
      }
    `
export default BusinessSettings;
