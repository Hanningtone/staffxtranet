import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";

import {
  SortableList,
  SortableItem,
  SortableItemProps,
  ItemRenderProps,
} from '@thaddeusjiang/react-sortable-list';
import { AdminLayout, SubHeader, UsersList } from "../components";
import SettingsMenu from "../components/settings/SettingsMenu";
import makeRequest from "../utils/fetch-request";
import SwitchSelector from "react-switch-selector";
import { useForm } from "react-hook-form";//@ts-ignore

const SettingsPage = (props: any) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [settings, setSettings] = useState<any>([]);
  const [markets, setMarkets] = useState<any>([]);
  const [selectedMkt, setSelectedMkt] = useState<any>();
  const [hotels, setHotels] = useState<SortableItemProps[]>([]);
  const [bookingWindow, setBookingWindow] = useState<any>();
  const [bookingWindowResponse, setBookingWindowResponse] = useState<any>();
  const [error, setError] = useState(null);
  const [settingChangeResponse, setSettingChangeResponse] = useState<any>(null);

  const fetchSettings = useCallback(() => {
    let _url = "/settings/get?append=markets";

    makeRequest({ url: _url, method: "get", data: null }).then(
      ([status, result]) => {
        if (status !== 200) {
          setError(result?.message || "Error, could not fetch records");
        } else {
          setSettings(result?.data || []);
          setMarkets(result?.extra?.markets|| []);
        }
      }
    );
  }, []);

  const fetchBookingWindow = () => {
    let _url = "/booking-windows/get?limit=1"

    makeRequest({ url: _url, method: "get", data: null }).then(
      ([status, result]) => {
        if (status !== 200) {
          setError(result?.message || "Error, could not fetch businsess");
        } else {
          setBookingWindow(result?.data[0] || []);
        }
      }
    );
  };
  const fetchMarketHotels = () => {
    let _url = "/business/get?market-id="+ selectedMkt?.id || 1;

    makeRequest({ url: _url, method: "get", data: null }).then(
      ([status, result]) => {
        if (status !== 200) {
          setError(result?.message || "Error, could not fetch businsess");
        } else {
          setHotels(result?.data || []);
        }
      }
    );
  };

  const onSubmit = (values: any) => {
        let endpoint = '/booking-windows/create';
        makeRequest({url:endpoint, method:"post", data:values}).then(([status, result]) => {
            console.log("Result is ", result, "status is ", status);
            if(status > 299){
                if(status < 500) { 
                    const field_errors:any = {};
                    Object.entries(result?.data).forEach( ([key, value]) =>  {
                    });
                    setBookingWindowResponse({status:false, message:result.message});
                } else {
                    setBookingWindowResponse({status:false, message:"Failed to create market due to error"});
                }
            } else {
                 setBookingWindowResponse({status:true, message:result.message, data:result});
            } 
        });
    }

  const hotelOrderChanged = (items:any) => {
       if (!items) {
           return false;
       }
       let total = items.length; 
       let updated_items:any = items.map((item:any) => {
               let new_item:any = { id:item.id, ranking:total};
               total--;
               return new_item;
       });
       console.log("This is my new order", updated_items)
       let endpoint = '/business/update/0';
       makeRequest({url:endpoint, method:"post", data:updated_items}).then(([status, result]) => {
            console.log("Result is ", result, "status is ", status);
        });
  }

  useEffect(() => {
     if(bookingWindow){
         setValue("run_from_date", bookingWindow.run_from_date);
         setValue("run_to_date", bookingWindow.run_to_date);
         setValue("booking_length", bookingWindow.booking_length);
     }
  }, [bookingWindow]);

  useEffect(() => {
     if(selectedMkt){
         fetchMarketHotels();
     }
  }, [selectedMkt]);

  useEffect(() => {
     if(markets){
         setSelectedMkt(markets[0]);
     }
  }, [markets]);

  useEffect(() => {
    fetchSettings();
    fetchBookingWindow();
  }, [fetchSettings]);

  useEffect(() => {
      hotelOrderChanged(hotels);
  }, [hotels])

  const getMarketOptions = (market:any) => {
  
      return [
        {
            label: <span>Yes</span>,
            value: {allow:1, market:market},
            selectedBackgroundColor: "#0097e6",
        },
        {
            label: "No",
            value: {allow:0, market:market},
            selectedBackgroundColor: "#fbc531"
        }
     ];
 }

 const getSettingOptions = (setting:any) => {
  return  [
    {
        label: <span>Yes</span>,
        value: {enable: 1, setting:setting},
        selectedBackgroundColor: "#0097e6",
    },
    {
        label: "No",
        value: {enable: 0, setting:setting},
        selectedBackgroundColor: "#fbc531"
    }
 ];
 }

 const changeSettingsStatus = (record : any) => {
        let endpoint = '/settings/update/'+record.setting.id;
        let values: any= { enabled: record.enable };
        makeRequest({url:endpoint, method:"post", data:values}).then(([status, result]) => {
            console.log("Result is ", result, "status is ", status);
            if(status > 299){
                if(status < 500) { 
                    setSettingChangeResponse({status:false, message:result.message});
                } else {
                    setSettingChangeResponse({status:false, message:"Failed to update setting due to error"});
                }
            } else {
                 setSettingChangeResponse({status:true, message:result.message, data:result});
            } 
        });
 };

 const changeMarketStatus = (record:any) => {
        console.log("This is the record", record)
        let endpoint = '/markets/update/'+record.market.id;
        let values: any= { allow_custom_listing: record.allow };
        makeRequest({url:endpoint, method:"post", data:values}).then(([status, result]) => {
            console.log("Result is ", result, "status is ", status);
        });
 };
const initialSelectedIndex = (market:any) => {
    return getMarketOptions(market).findIndex(({value}) => value.allow === market.allow_custom_listing);
}

const initialSettingIndex = (setting:any) => {
 return getSettingOptions(setting).findIndex(({value}) => value.enable === setting.enabled);
}

const selectionRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}
  return (
    <AdminLayout showSideMenu={true} user={props.user}>
      <Home>
        <SubHeader
          pageTitle="Settings"
          pageSubTitle="Uncover settings"
          btnTxt="Save Details"
          onPress={() => void null}
          showCreateButton={false}
        />
        <div className="container-fluid">
          <div className="row pe-4">
                <div className="col-lg-2">
                    <SettingsMenu />
                </div>
                <div className="col-lg-10 ">
                  <div className="row">
                 <div className="col-lg-6">
                 <div className="bg-white">
                  <h6>Top deals</h6>

                    { settingChangeResponse?.status === true && (<div className = {
                     `alert alert-${settingChangeResponse?.status === true ? 'success': 'danger'}`} role="alert">
                      {settingChangeResponse?.message} 
                    </div>) }
                    <div className="deal-wrapper">

                        { settings && settings?.map((setting:any) => {
                           return ( <>
                              <p className="deal-container">{setting.name}</p>
                              <div className="profile-selector-wrapper" style={{width: 100}}>
                                  <SwitchSelector
                                    onChange={changeSettingsStatus}
                                    options={getSettingOptions(setting)}
                                    initialSelectedIndex={initialSettingIndex(setting)}
                                    backgroundColor={"#353b48"}
                                    fontColor={"#f5f6fa"}
                                  />
                             </div>
                             </>)
                         })
                         }
                    </div>
                 </div>
                 </div>
                 <div className="col-lg-6">
                  <div className="bg-white">
                    
                    <div>
                    { bookingWindowResponse?.status === true && (<div className = {
                         `alert alert-${bookingWindowResponse?.status === true ? 'success': 'danger'}`} role="alert">
                          {bookingWindowResponse?.message} 
                        </div>) }
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <h6>Booking Window</h6>
                          <div className="deal-wrapper">
                            <select className="form-select" 
                                {...register('booking_length', { required: true, value:bookingWindow?.booking_length})} >
                              <option value="weekend">Weekend</option>
                              <option value="7 day" selected>7 Days</option>
                              <option value="14 day">14 Days</option>
                              <option value="1 month">1 Month</option>
                              <option value="2 month">2 Months</option>
                              <option value="3 month">3 Months</option>
                            </select>
                        </div>
                        <div className="deal-wrapper duration-container">
                          <input type="date"  {...register('run_from_date')} className="form-control me-2" placeholder="From date"></input>
                          <input type="date" {...register('run_to_date')} className="form-control" placeholder="To date"></input>
                        </div>
                        <div className="flex-row-btwn modal-bar-wrapper">
                            <button className="btn btn-outline-primary ms-2" type="submit">Save</button>
                        </div>
                    </form>
                 </div>
                  </div>
                  </div>
                  </div>

                  <h6 className="mt-5">Customize hotel rankings</h6>
                  <div className="custom-listing-wrapper bg-white">
                      <div className="row">
                        <div className="col-lg-3">
                            <div className="markets-wrapper">
                                 <ul>
                                   {markets && markets?.map((market:any) => { 
                                       return (
                                           <li onClick={() => setSelectedMkt(market)} 
                                               className={`${selectedMkt?.market_name == market.market_name ? 'active' :'' }`}>
                                                   <span>{market.market_name}</span><i className="fa fa-angle-right"></i>
                                           </li>)
                                       }) 
                                   }
                                 </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                         
                          <div className="hotels-wrapper">
                            <div className="hotel-custom-listing">
                                <h6>Custom listing for {selectedMkt?.market_name}</h6>
                                <div className="profile-selector-wrapper" style={{width: 100}}>
                                { selectedMkt && <SwitchSelector
                                  onChange={changeMarketStatus}
                                  options={getMarketOptions(selectedMkt)}
                                  initialSelectedIndex={initialSelectedIndex(selectedMkt)}
                                  backgroundColor={"#353b48"}
                                  fontColor={"#f5f6fa"}
                                />
                                }
                                </div>
                            </div>
                            <SortableList
                                items={hotels}
                                setItems={setHotels}
                                itemRender={({ item }: ItemRenderProps) => (
                                  <div className="hotel">
                                    <div className="number">{item.id}</div>
                                    <div className="hotel-photo">

                                    </div>
                                    <div className="hotel-details">
                                       <h6>{item.name}</h6>
                                       <span>{item.description}</span>
                                    </div>
                                  </div>
                                )}
                              />
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
      </Home>
    </AdminLayout>
  );
};

const Home = styled.div`
  width: 100%;
  height: auto;
  .bg-white {
    background-color: #fff;
    padding: 25px;
  }
  .col-lg-12 {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    padding: 0;
    .booking-tab {
      flex: 0.2;
      background-color: #fff;
      padding: 30px 20px;
      position: relative;
      p {
        cursor: pointer;
      }
      .fa {
        font-size: 1.1rem;
        padding-right: 20px;
      }
      a {
        text-decoration: none;
        color: #000;
      }
    }
    .booking-details {
      flex: 0.78;
      height: 100%;
      background-color: #f1f1f1;
    }
  }
  .booking-container {
    margin: 20px 0px 100px 0px;
  }
  .deal-wrapper{
            border: 1px solid #f5f5f5;
            padding:25px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
  }
  .duration-container{
    border-top:none;
    margin-top:-15px;
    .to-time-picker{
      text-align:center;
    }
  }
  h6{
    font-size:16px;
    margin-bottom:10px;
  }
  select{
    width: 100%;
    padding:7px;
  }
  .markets-wrapper{
    width: 100%;
  }
  .markets-wrapper ul{
    margin:0px;
    padding:0px;
  }
  .markets-wrapper li{
    list-style: none;
    background-color: #f1f1f1;
    margin:3px 0px;
    padding:10px 15px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .markets-wrapper li i{
    margin-top:5px;
  }
  .markets-wrapper li:hover, .markets-wrapper li.active{
    background-color:#188754;
    color:#fff;
  }
  .hotels-wrapper{
    background-color: #f1f1f1;
    width:100%;
    padding:15px 25px;
  }
  .hotel{
    height:100px;
    background-color:#fff;
    margin:15px 0px;
    display: flex;
    display: flex-direction;
  }
  .hotel-photo{
    background-color:#333;
    width:100px;
    height:100px;
  }
  .hotel-details{
    padding:15px
  }
  .hotel-custom-listing{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color:#188754;
    padding:10px 20px;
  }
  .hotel-custom-listing h6{
    margin-top:10px;
    color:#fff
  }
  .number{
    background-color:#188754;
    padding:5px 12px;
    color:#fff;
    position: absolute;
    font-weight: bold;
  }
`;
export default SettingsPage;
