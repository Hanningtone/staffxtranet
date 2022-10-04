import styled from "styled-components";
import { 
    AdminLayout,
    SubHeader
 } from "../components";

import HotelsMenu from "../components/hotels/HotelMenu";

import React, { useContext, useEffect, useState } from "react";
import {Context}  from '../context';

const HotelRooms = (user: any) => {

    return (
        <AdminLayout showSideMenu={true}  user={user}>
            <SubHeader
             pageTitle="The Social House"
             pageSubTitle="Hotel short description"
             btnTxt="Save Changes"
             onPress = {()=>null}
             showCreateButton = {true}
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2"> <HotelsMenu/></div>
                    <div className="col-lg-10">
                        <div className="row">
                            <div className="col-lg-12">
                                <Uploader>
                                    <table width="100%">
                                        <thead>
                                            <tr>
                                                <td></td>
                                                <td className="data-cell">Today</td>
                                                <td className="data-cell">Wed 13/9</td>
                                                <td className="data-cell">Wed 14/9</td>
                                                <td className="data-cell">Wed 15/9</td>
                                                <td className="data-cell">Wed 16/9</td>
                                                <td className="data-cell">Wed 17/9</td>
                                                <td className="data-cell">Wed 18/9</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                               <td>Commission</td>
                                                <td className="data-cell" contentEditable='true'>8%</td>
                                                <td className="data-cell" contentEditable='true'>8%</td>
                                                <td className="data-cell" contentEditable='true'>8%</td>
                                                <td className="data-cell" contentEditable='true'>8%</td>
                                                <td className="data-cell" contentEditable='true'>8%</td>
                                                <td className="data-cell" contentEditable='true'>8%</td>
                                                <td className="data-cell" contentEditable='true'>8%</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={8} className="heading"><b>Run of House</b></td>
                                            </tr>
                                            <tr>
                                                <td>Rooms sold</td>
                                                <td className="data-cell">-</td>
                                                <td className="data-cell">-</td>
                                                <td className="data-cell">-</td>
                                                <td className="data-cell">-</td>
                                                <td className="data-cell">-</td>
                                                <td className="data-cell">-</td>
                                                <td className="data-cell">-</td>
                                            </tr>
                                            <tr>
                                                <td>Total ROH Rooms</td>
                                                <td className="data-cell" contentEditable='true'>8</td>
                                                <td className="data-cell" contentEditable='true'>8</td>
                                                <td className="data-cell" contentEditable='true'>8</td>
                                                <td className="data-cell" contentEditable='true'>8</td>
                                                <td className="data-cell" contentEditable='true'>8</td>
                                                <td className="data-cell" contentEditable='true'>8</td>
                                                <td className="data-cell" contentEditable='true'>8</td>
                                            </tr>
                                            <tr>
                                                <td>Rate (Kes)</td>
                                                <td className="data-cell" contentEditable='true'>Kes 0.0</td>
                                                <td className="data-cell" contentEditable='true'>Kes 0.0</td>
                                                <td className="data-cell" contentEditable='true'>Kes 0.0</td>
                                                <td className="data-cell" contentEditable='true'>Kes 0.0</td>
                                                <td className="data-cell" contentEditable='true'>Kes 0.0</td>
                                                <td className="data-cell" contentEditable='true'>Kes 0.0</td>
                                                <td className="data-cell" contentEditable='true'>Kes 0.0</td>
                                            </tr>
                                            <tr>
                                                <td>Discount %</td>
                                                <td className="data-cell" contentEditable='true'>0</td>
                                                <td className="data-cell" contentEditable='true'>0</td>
                                                <td className="data-cell" contentEditable='true'>0</td>
                                                <td className="data-cell" contentEditable='true'>0</td>
                                                <td className="data-cell" contentEditable='true'>0</td>
                                                <td className="data-cell" contentEditable='true'>0</td>
                                                <td className="data-cell" contentEditable='true'>0</td>
                                            </tr>
                                            <tr>
                                                <td>Net rate (kes)</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                            </tr>
                                            <tr>
                                                <td className="heading" colSpan={8}><b>Promotions</b></td>
                                            </tr>
                                            <tr>
                                                <td>Stay another night offer (kes)</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                                <td className="data-cell">Kes 0.0</td>
                                            </tr>
                                           
                                        </tbody>
                                    </table>
                                </Uploader>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

const Uploader = styled.div`{
        width:100%;
        min-height:100px;
        background-color: #fff;
        margin-bottom:10px;
        table tr td{
            padding: 20px 15px;
        }
        table tr td.data-cell{
            text-align:center;
            vertical-align: middle;
        }
        table tr td.data-cell:hover{
            border:1.5px solid blue;
        }
        table tbody tr td.heading{
            padding: 10px 15px;
            background-color:#f9f9f9;
        }

    }
    `

export default HotelRooms;
