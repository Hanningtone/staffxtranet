import { useEffect, useCallback, useState, useContext  } from 'react';

import styled from "styled-components";
import { useQuery} from 'react-query';
import { AdminLayout, 
    SubHeader,
    UncoverModal,
    CategoriesForm,
    TableLoaders,
    LineChart
 } from "../components";
 import CategoryService from "../services/CategoryService";
 import SettingsMenu from "../components/settings/SettingsMenu";

import makeRequest from "../utils/fetch-request";
import DataTable from "../utils/table"
import { Context } from "../context";


const CategoriesPage = (user: any) => {

    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState<any>();
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [state, dispatch ] =  useContext(Context);
    const [token, setToken] = useState();
    const [error, setError] = useState();

    const showModalForm = (show: boolean) =>{
        setShowModal(show);
    }

    const editSelectedCategory = () => {
        showModalForm(!showModal);
    }
    const getCategories = () => {
        let _url = "/categories/get";
    
        makeRequest({ url: _url, method: "get", data: null }).then(
          ([status, result]) => {
            if (status !== 200) {
              setError(result?.message || "Error, could not fetch records");
            } else {
              setCategories(result?.data || []);
            }
          }
        );
      };

    useEffect(() => {
        if(categories) {
            setSelectedCategory(categories[0]);
        }
    }, [categories])

    useEffect(() => {
        dispatch({type:"SET", key:'context', payload:'categoriespage'});
        getCategories();
    }, [])


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

    return (
        <AdminLayout showSideMenu={true} user={user}>
        <Home>
            <SubHeader
             pageTitle="Categories"
             pageSubTitle="8 Uncover hotel subcatgories"
             btnTxt="Create new category"
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
                                    <td>Name</td>
                                    <td>Total Hotels</td>
                                    <td>Color</td>
                                    <td>Description</td>
                                </tr>
                            </thead>
                            
                            {categories && (
                                <tbody>
                                    {categories.map((category:any) => {
                                     return  <tr onClick ={ () => setSelectedCategory(category)}>
                                        <td>{category.name}</td>
                                        <td><span className="default">{category?.hotels|| 0}</span></td>
                                        <td><span className="category" style={{background:category?.category_color|| "#fff" }}>{category?.category_color}</span></td>
                                        <td>{category.description}</td>
                                    </tr>
                                    })
                                    }
                                </tbody>
                            )
                            }

                        </table>
                    </div>

                    <div className="col-lg-4">
                        { selectedCategory && 
                        <Sidebar>
                            <div className="field-wrapper">
                                <div>
                                    <span>{selectedCategory.name}</span>
                                </div>
                                <div className="btnwrapper">
                                    <button onClick={editSelectedCategory}>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </div>
                            <hr className="firstchild" />
                            <div className="field-wrapper">
                                <span>Category Name:</span>
                                <span>{selectedCategory.name}</span>
                            </div>
                            <hr  />
                            <div className="field-wrapper">
                                <span>Color:</span>
                                <span style={{background: selectedCategory.category_color}}>{selectedCategory.category_color}</span>
                            </div>
                            <hr />
                            <div className="field-wrapper">
                                <span>Description:</span>
                                <span >{selectedCategory.description}</span>
                            </div>
                        </Sidebar>
                        }
                        <Sidebar>
                            <div className="field-wrapper">
                                    <div>
                                        <span><strong>Categories Stats</strong></span>
                                    </div>
                                </div>
                                <LineChart data={data}/>
                        </Sidebar>
                    </div>
                </div>
            </div>
            <UncoverModal show={showModal}>
                <CategoriesForm setShowModal={setShowModal}/>
            </UncoverModal>
        </Home>
        </AdminLayout>
    )
}

const Home = styled.div`
    width: 100%;
    height: auto;
    .bg-c{
        padding:10px ;
    }
    .bg-white{
        border:1px solid #ccc;
        background-color:#fff;
        padding:10px ;
    }
    .col-lg-8,.col-lg-4{
        padding:0px;
    }
    `
const Sidebar = styled.div`
    width:100%;
    border:1px solid #ccc;
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

export default CategoriesPage;
