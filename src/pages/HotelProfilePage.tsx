import styled from "styled-components";
import GoogleMapReact from 'google-map-react';
import SwitchSelector from "react-switch-selector";
import { 
    AdminLayout,
    SubHeader
 } from "../components";

import HotelsMenu from "../components/hotels/HotelMenu";

import React, { useContext, useEffect, useState } from "react";
import {Context}  from '../context';
import { useLocation, useParams} from "react-router-dom";
import makeRequest from "../utils/fetch-request";

const AnyReactComponent = ({ text }: any) => 
    <div className='map-marker'>
        <i className='fa fa-map-marker'/>
        <div className='marker-text'>
            <p>{text}</p>
         </div>
    </div>;

const HotelProfilePage = (user: any) => {
    const {state} = useLocation();
    const [currentHotel, setCurrentHotel] = useState(state);
    const [error, setError] = useState<any>();
    const { id } = useParams();


    const fetchHotelDetials = (id:number) => {
      let _url = "/business/detail/1?with=house-rules@business_id,"
         + "user-business-access@business_id,business-branch@business_id,"
         + "business-branch@business_id,business-photos@business_id,"
         + "room-amenities@business_id,room-perks@business_id,"
         + "business-stats@business_id,customer_reviews@business_id";
      
  
      makeRequest({ url: _url, method: "get", data: null }).then(
        ([status, result]) => {
          if (status !== 200) {
            setError(result?.message || "Error, could not fetch records");
          } else {
            setCurrentHotel(result?.data || []);   
     
          }
        }
      );
      
    }

    useEffect(()=> {
        let h_id = Number(id);
        fetchHotelDetials(h_id);

    }, [])
    const defaultProps = {
        center: {
          lat: -1.2627149,
          lng: 36.8023322
        },
        zoom: 7
    };

    const options = [
        {
            label: <span>Yes</span>,
            value: {
                 yes: true
            },
            selectedBackgroundColor: "#0097e6",
        },
        {
            label: "No",
            value: "true",
            selectedBackgroundColor: "#fbc531"
        }
     ];

     const onChange = (newValue : any) => {
        console.log(newValue);
    };

     const initialSelectedIndex = options.findIndex(({value}) => value === "bar");

    return (
        <AdminLayout showSideMenu={true}  user={user}>
            <SubHeader
             pageTitle="The Social House"
             pageSubTitle="Hotel short description"
             btnTxt="Delete Profile"
             onPress = {()=>null}
             showCreateButton = {true}
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2"> <HotelsMenu/></div>
                    <div className="col-lg-10">
                        <div className="row mb-5">
                            <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                            <i className="fa fa-bed"></i>
                                        </div>
                                        <div className="stat-top-wrapper">
                                                <p className="stat-title">Total Branches on Uncover</p>
                                                <p className="stat-total">{currentHotel && currentHotel["business-stats"][0].total_branches}</p>
                                        </div>
                                    </div>
                            </div>
                            <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                            <i className="fa fa-bed"></i>
                                        </div>
                                        <div className="stat-top-wrapper">
                                                <p className="stat-title">Total rooms on Uncover</p>
                                                <p className="stat-total">{currentHotel && currentHotel["business-stats"][0].available_rooms}</p>
                                        </div>
                                    </div>
                            </div>
                            <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                            <i className="fa fa-bed"></i>
                                        </div>
                                        <div className="stat-top-wrapper">
                                                <p className="stat-title">Views on Uncover</p>
                                                <p className="stat-total">{currentHotel && currentHotel["business-stats"][0].profile_views}</p>
                                        </div>
                                    </div>
                            </div>
                            <div className="col-lg-3">
                                    <div className="home-stat-wrapper">
                                        <div className="stat-icon">
                                            <i className="fa fa-bed"></i>
                                        </div>
                                        <div className="stat-top-wrapper">
                                                <p className="stat-title">Bookings on Uncover</p>
                                                <p className="stat-total">{currentHotel && currentHotel["business-stats"][0].total_booking}</p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <Profile>
                                   <div className="profile-header">
                                       <p>Basic Info</p>
                                       <div className="profile-controls">
                                           <a href="#"><i className="fa fa-edit"></i> Edit</a>
                                       </div>
                                   </div>
                                   <hr></hr>
                                   <div className="field-wrapper">
                                        <span className="left"> Name:</span>
                                        <span>{currentHotel && currentHotel.name}</span>
                                    </div>
                                    <div className="field-wrapper">
                                        <span className="left">Category:</span>
                                        <span>{currentHotel && currentHotel.category.category_name}</span>
                                    </div>
                                    <div className="field-wrapper">
                                        <span className="left">Market:</span>
                                        <span>{currentHotel && currentHotel?.market?.market_name}</span>
                                    </div>
                                    <div className="field-wrapper">
                                        <span className="left">Property Type:</span>
                                        <span>{currentHotel && currentHotel.property_type}</span>
                                    </div>
                                    <div className="field-wrapper">
                                        <span className="left">Primary Contact:</span>
                                        <span>{ currentHotel && currentHotel.primary_contact_number}</span>
                                    </div>
                                    <div className="field-wrapper">
                                        <span className="left">Request to book enabled:</span>
                                        <span>{currentHotel && currentHotel.request_to_book_enabled }</span>
                                    </div>
                                  
                                </Profile>
                                <Profile>
                                    <div className="profile-header">
                                        <p>Location</p>
                                        <div className="profile-controls">
                                           <a href="#"><i className="fa fa-edit"></i> Edit</a>
                                        </div>
                                    </div>
                                   <hr></hr>
                                   <div className="map-container">
                                        <GoogleMapReact
                                            bootstrapURLKeys={{ key: "AIzaSyCEwwAr9ClLZ8obW1mYOyefXpflbfweqVo" }}
                                            center={defaultProps.center}
                                            defaultZoom={defaultProps.zoom}>
                                            <AnyReactComponent
                                            lat={ -1.2627149}
                                            lng={36.8023322}
                                            text="Sankara Hotel"
                                            />
                                        </GoogleMapReact>
                                    </div>
                                </Profile>
                                <Profile>
                                    <div className="profile-header">
                                        <p>Photos</p>
                                        <div className="profile-controls">
                                           <a href="#"><i className="fa fa-edit"></i> Add Photo</a>
                                        </div>
                                    </div>
                                   <hr></hr>
                                    <div className="profile-photo-wrapper">
                                     
                                      { currentHotel && currentHotel["business-photos"].map((photo:any) => {
                                          return (<div className="profile-photo"><img src={photo.url_path} alt="" /></div>)
                                        })
                                      }
                                    </div>  
                                </Profile>
                               { /*  <Profile>
                                   <div className="profile-header">
                                       <p>Why we love it</p>
                                       <div className="profile-controls">
                                           <a href="#"><i className="fa fa-edit"></i> Add</a>
                                        </div>
                                   </div>

                                   <hr></hr>
                                   <div className="profile-content">
                                      <div className="profile-list">
                                         <p><i className="fa fa-check-square"></i><span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel </span> </p>
                                      </div>
                                      <div className="profile-list">
                                          <p><i className="fa fa-check-square"></i> <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel </span> </p>
                                      </div>
                                      <div className="profile-list">
                                         <p><i className="fa fa-check-square"></i><span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel </span> </p>
                                      </div>
                                   </div>
                                </Profile> */}
                                   
                                <Profile>
                                    <div className="profile-header">
                                        <p>Services and Amenities</p>
                                    </div>
                                    <hr></hr>
                                    <div className="profile-services">
                                        { currentHotel && currentHotel["room-amenities"].map((am:any) => { 
                                             return (<div className="profile-list">
                                               <span><b>{am.name}</b> &nbsp; {am.description}</span>
                                               <div className="profile-selector-wrapper" style={{width: 100}}>
                                                <SwitchSelector
                                                        onChange={onChange}
                                                        options={options}
                                                        initialSelectedIndex={initialSelectedIndex}
                                                        backgroundColor={"#353b48"}
                                                        fontColor={"#f5f6fa"}
                                                    />
                                                </div>
                                            </div>)
                                        })
                                        }

                                    </div>
                                </Profile>

                                <Profile>
                                    <div className="profile-header">
                                        <p>Perks</p>
                                        <div className="profile-controls">
                                           <a href="#"><i className="fa fa-edit"></i> Add</a>
                                        </div>
                                    </div>
                                   <hr></hr>
                                   <div className="profile-content">
                                        { currentHotel && currentHotel["room-perks"].map((perk:any) => {

                                           return (<div className="profile-list">
                                                 <p><i className="fa fa-check-square"></i><span><b>{perk.name}</b> &nbsp; {perk.description}</span> </p>
                                              </div>)
                                          })
                                      }
                                   </div>
                                    
                                </Profile>
                              
                                
                            </div>
                            <div className="col-lg-6">
                               <Profile>
                                    <div className="profile-header">
                                        <p>Managers</p>
                                    <div className="profile-controls">
                                           <a href="#"><i className="fa fa-edit"></i> Add</a>
                                    </div>
                                    </div>
                                   <hr></hr>
                                   {currentHotel && currentHotel?.["user-business-access"]?.map( (adminUser : any) => {
                                    return ( 
                                    <div className="profile-wrapper">
                                        <div className="item-photo"></div>
                                            <div className="item-datails">
                                                <h6>{ adminUser.user} </h6>
                                                <p>{adminUser.contact}</p>
                                                <p> { adminUser.roles.map((role:any) => {
                                                     return role.role;   
                                                })}</p>
                                            </div>
                                        </div> )
                                   })}
                                   
                                </Profile>
                                <Profile>
                                    <div className="profile-header">
                                        <p>House Rules</p>
                                        <div className="profile-controls">
                                           <a href="#"><i className="fa fa-edit"></i> Add</a>
                                        </div>
                                    </div>
                                   <hr></hr>
                                   <div className="profile-content">
                                      { currentHotel && currentHotel["house-rules"].map((rule:any) => { 
                                          return (<div className="profile-list">
                                             <p><i className="fa fa-check-square"></i><span> {rule.narration} </span> </p>
                                          </div>)
                                          } 
                                      )}
                                   </div>
                                </Profile>
                               
                                <Profile>
                                    <div className="profile-header">
                                        <p>Branches</p>
                                        <div className="profile-controls">
                                           <a href="#"><i className="fa fa-edit"></i> Add</a>
                                        </div>
                                    </div>
                                   <hr></hr>
                                   <div className="profile-wrapper">
                                    {currentHotel && currentHotel["business-branch"].map((branch:any) => {
                                      return (<>
                                             <div className="item-photo"></div>
                                             <div className="item-datails">
                                                <h6>{branch.branch_name}</h6>
                                                <p>{branch.description}</p> 
                                             </div>
                                         </>)
                                         })
                                     }
                                   </div>
                                </Profile>

                                <Profile>
                                    <div className="profile-header">
                                        <p>Reviews</p>
                                    </div>
                                   <hr></hr>
                                   <div className="profile-wrapper">
                                    {currentHotel && currentHotel["customer_reviews"].map((review:any) => { 
                                            return (<div><span>Rating <br/> <h5> { review.rate }</h5></span></div>)
                                        })
                                    }
                                   </div>
                                </Profile>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

const Profile = styled.div`{
        width:100%;
        min-height:100px;
        border:1px solid #f1f1f1;
        background-color: #fff;
        margin-bottom:10px;
        padding:15px;
        hr{
            margin:5px 0px 15px 0px;
        }
        .field-wrapper{
            display:flex;
            align-items:center;
            .btnwrapper button{
                border:none;
                outline:none;
                margin-left:20px;
                padding:3px 7px;
            }
            span{
                font-size:.85rem;
                margin:8px 0px;
            }
            span.left{width: 190px;}
            .color{
                background-color:orange;
                padding:3px 7px;
                border-radius:5px;
                text-align:center;
            }
        }
        .profile-header{
            position: relative;
            p {
                padding:0px;
                margin:0px !important;
                font-weight: bold;
            }
            .profile-controls{
                position: absolute;
                right:10px;
                top:0px;
            }
            .profile-controls a{
                color: #000;
                text-decoration: none;
            }
            .profile-controls a:hover{
                color: blue;
            }
        }
        .profile-wrapper{
            display:flex;
            align-items:center;
            .item-photo{
                background-color:#ccc;
                height:80px;
                width:80px;
            }
             .item-datails{  
                height:100px;
                padding:10px;
            }
            .item-datails p{
                margin:0px 0px 5px;
                font-size:13px;
            }
            h5{
                text-align:center;
            }
        }
        .profile-photo-wrapper{
            height:auto;
            width:100%;
            display:grid;
            grid-template-rows:repeat(3,126.5px);
            grid-template-columns:repeat(2,4fr);
            gap:10.4px;
            .profile-photo{
                background-color:#ccc;
                height:130px;
                border-radius:5px
            }
           }
        .profile-content{
            width:100%;
            margin-bottom:10px;
            .fa-check{
            margin-left:-10px;
            }
        }
        .profile-list{
            border: 1px solid #f5f5f5;
            padding:10px 15px;
            margin-bottom:10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .profile-list:hover{
            background-color: #f5f5f5;
        }
        .profile-list i{
            color: green;
            font-size:14px;
            margin-right:5px;
        }
        .profile-list p, span{
            margin:0;
            font-size:12px;
        }
        .map-container{
            height: 200px;
            width: 100%;
            background-color:#ccc
        }
      
        .map-marker{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            transform: translate(-50%, -50%);
        }
        .map-marker i{
            color: #f00;
            font-size: 40px;
        }
        .marker-text{
        padding: 10;
        position: absolute;
        top: 0px;
        right: 0px;
        }
        .map-marker p{
            font-size: 14px;
            font-weight: bold;
        }
        .text-area{
            min-height: 150px;
        }
    }
    `

export default HotelProfilePage;
