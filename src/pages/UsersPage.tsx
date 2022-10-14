import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import makeRequest from "../utils/fetch-request";
import DataTable from "../utils/table";
import { AdminLayout, SubHeader } from "../components";
import { UncoverModal }from "../components";
import UsersForm from "../components/forms/UsersForm";
import { Context } from '../context';
import CustomModalPane from "../utils/_modal";
import { getFromLocalStorage, removeItem } from '../utils/local-storage';
import { forEachChild } from "typescript";
import { FaUserEdit } from 'react-icons/fa'



const UsersList = (props: any) => {
  const [userList, setUserList] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [state, dispach] = useContext(Context);
  const [classname, setClassName] = useState("");
  const [user, setUser] = useState<any>();
  //  const [businesses, setBusiness] = useState([]);
  const [selectedrecord, setSelectedRecord] = useState(user);
  const[submitTitle, setSubmitTitle] = useState("Create an User");
  const[modalTitle, setModalTitle] = useState("Create User");

  const model = 'users';

// get current user from local storage
useEffect(() => {
  dispach({type:"SET", key:'context', payload:'userspage'});
}, [])

// Handle Edit

const onEditFunction = (event : any, model : any, user: any) => {
  dispach({type:"SET", key:"updaterecord", payload:{id:user.id, model:model}});
  setShowModal(true);
};

  
  useEffect(() => {
    setUser(getFromLocalStorage("user"));   

    if(user){
        console.log(" And our user is", user);
    }
}, []);


// fetch users from API

useEffect(() => {
  if(state?.context){
    let status = state[state.context].status;
    let message = state[state.context].message;
    let data = state[state.context]?.data || {};

    if(status === true){
      setClassName('alert alert-success');     
    } else {
      setClassName('alert alert-danger');
    }
    setMessage(message);
  }

}, [state?.userspage])


  const fetchUsers = useCallback(() => {
    let _url = "/users/get";

    makeRequest({ url: _url, method: "get", data: null }).then(
      ([status, result]) => {
        if (status !== 200) {
          setError(result?.message || "Error, could not fetch records");
        } else {
          console.log(result);
          setUserList(result?.data || []);
        }
      }
    );
  }, []);

 useEffect(() => {
    
  if(user){
    let id = user.id;
    let model = 'users';
      console.log(" Current User ID ", user.id);
      let data_url = '/'+model+'/get?id=' + id;
      makeRequest({url:data_url, method:'get', data:null}).then(([status, response])=> {
          if(status !== 200){
              dispach({type:'SET', key:'server_error', payload:response.message})

          } else {
              setSelectedRecord(response.data.shift());
          }
          setSubmitTitle('Update your details');
          setShowModal(true);
      })
  }
},[])

  useEffect(() => {
    fetchUsers();
    console.log(userList);
  }, [fetchUsers]);


  // show modal ..
  const showModalForm = (show: boolean, title='Create Event', submitTitle='Create Record') =>{
    setModalTitle(title);
    setSubmitTitle(submitTitle);
    setShowModal(show);
    
}
// 
  return (
    <AdminLayout showSideMenu={true} user={props.user}>
      <Home>
        <SubHeader
          pageTitle="All Users"
          pageSubTitle="0 Users on Uncover"
          btnTxt="Create new user"
          onPress = {()=>showModalForm(!showModal)}
          showCreateButton={true}
        />
        <div className="container-fluid">
          <div className="row pe-1">
              <div className="col-lg-6">

                  <DataTable data = {userList }/>
              </div>
              <div className="col-lg-4">
                        <Sidebar>
                                <div className="field-wrapper">
                                    <div>
                                            <span className="h1">Your Profile</span>
                                    </div>
                                    <div className="btnwrapper">
                                            <FaUserEdit />
                                            <button onClick={ (event) => onEditFunction(event, model, user.id) }>Edit Details  </button>
                                            
                                            
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
                                <hr />
                                <div className="field-wrapper">
                                    <span className="h5">Password </span>
                                    <span className="change-password">
                                    <span className="aste"> **** </span> &nbsp; &nbsp;
                                    <span>
                                    <button className="change__password__btn"> Change Password </button>
                                    </span>
                                    </span>
                                </div>
                               
                            </Sidebar>
                            <Sidebar>
                               <div className="field-wrapper">
                                    <div>
                                        <span><strong>My Businesses </strong></span>

                                    </div>
                                </div>

                                <hr className="firstchild" />
                                <div className="">
                                  <ul className="items-list">
                                    
                                    {user?.business_access.map((value:any) => {
                                       return <li style={{ width:"100%" }}> {value.business_name} </li>
                                    })
                                    
                                    }
                                  </ul>
                                    
                                </div>

                                
                            </Sidebar>
                    </div>
          </div>
        </div>

        <CustomModalPane
                show={showModal}
                title=" Create User"
                target="create-user"
                hideThisModal={() => setShowModal(false)}
              >
                {message && <div className={classname}>{message}</div>}
                <UsersForm setShowModal={showModal}
                selectedRecord={selectedrecord}
                submitTitle = { submitTitle }
                />
              </CustomModalPane>

      </Home>
    </AdminLayout>
  );
};

const Home = styled.div`
  width: 100%;
  height: auto;
  .bg-white {
    background-color: #fff;
    padding: 10px;
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
  
`;

const Sidebar = styled.div`
width:100%;
border:1px solid #f1f1f1;
background-color:#fff;
padding:10px;
margin-bottom:20px;
.change__password__btn {
  margin-left : 10px;
  border:solid 1px #dedede;
  outline:none;
  margin-left:20px;
  padding:3px 7px;
}
.aste {
  letter-spacing: 0.5em;
  font-weight : bold;
}
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

export default UsersList;
