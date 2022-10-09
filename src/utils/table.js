import React, { useEffect, useState, useContext} from 'react';
import { Context }  from '../context';
import styled from 'styled-components';
import { FaEdit } from 'react-icons/fa';
import { FcFullTrash } from 'react-icons/fc';
import {Navigate, useNavigate} from 'react-router-dom';
import tablestyles from './tablestyles.css';


const Th = (props) => {
   return <th scope="col"  style={{ "background-color" : "#931a1dbc", "color" : "#fff" }}>{props?.name}</th>
}

const TableHeader = (props) => {

    return (
        <thead className="thead-light">
          <tr>
            { props?.skipCell0 && <Th /> }
            { 
                props?.headers?.map((name, index) => {
                   return  <Th name={name} key={index} />
                })
            }
            {
               props.showActions &&  <Th name={"Action"} key={-1} />
            }
          </tr>
        </thead>
    );
}

const TdActions = (props) => {
    const {model, actions, recordId} = props;
    const [ state, dispatch ] =  useContext(Context);

    const onEditFunction = (event, model, id) => {
       dispatch({type:"SET", key:"updaterecord", payload:{id:id, model:model}});
    };

    const deleteItem = (model, id) => {
       dispatch({type:"SET", key:"deleterecord", payload:{id:id, model:model}});
    };

    return (
       <td data-title="Action">
        {
            actions.print && (<a href={`/${model}/report/${recordId}`} target="_blank" className="text-muted m-1" data-placement="top" data-toggle="tooltip" title="Report" data-original-title="Report">
             <i className="fa fa-print"></i>
            </a>)
        }
        {
            actions.view && (<a href={`/${model}/detail/${recordId}`} className="text-success m-1" data-placement="top" data-toggle="tooltip" title="View" data-original-title="View">
              <i className="fa fa-eye"></i>
            </a>)
        }
        {   
                actions.relations && (<a href={`/${model}/detail?id=${recordId}&with=${actions.relations}`} className="text-success m-1" data-placement="top" data-toggle="tooltip" title="View" data-original-title="View">
                <i className="fa "> </i>
             </a>)
         }
        {
           actions.edit && (<a href="#" onClick={(event) => onEditFunction(event, model, recordId)}  className="text-primary" >
                <i className="fa action__icons "> <FaEdit /> </i>
             </a>)             
        }
        {
           actions.delete && (<a href="#"  
               onClick={() => deleteItem(model, recordId)} 
               className="text-danger m-1" data-placement="top" data-toggle="tooltip" title="" data-original-title="Delete">
              <i className="fa action__icons delete"> <FcFullTrash /> </i>
           </a>)
        }
        
      </td>

    );
}

const Td = (props) => {
    let recordId = props.recordId;
    const navigate = useNavigate();
    let fontWeight = props?.heading ? "font-weight-bold table-active" :"";
    return (
       <td colSpan={props?.colspan} className={fontWeight} onClick={ ()=>  navigate(`/${props.model}/detail?id=${recordId}&with=${props.actions.relations}`)}>
           <div className={`d-flex align-items-center` }>
            {props?.value}
           </div>
       </td>
    );
}

const Tr = (props) => {

   const {model, actions} = props.showActions ?? {};

   useEffect(() => {

   }, [props]);

   const noneEditableMarkup = () => {
      return (
          <tr>
            { 
                Object.entries(props?.row_data||[]).map(([key, value]) => {
                    if(!endsWith(key, "_id") && !(key === 'id')){


                        if(Array.isArray(value) ){
                            return null;
                        } else {
                            return <Td value={value} 
                                key={`id-${key}`} 
                                colspan={props?.colspan || ""} 
                                heading={props?.heading|| false} 
                                model={model} 
                                recordId={props.recordId} 
                                actions = {actions} />
                        }
                    }
                })
            }
            {
               props.showActions && (<TdActions actions={actions} model={model} recordId={props.recordId}/>) 
            }

          </tr>
       );
   }

  const editableMarkup = () => {
      const editableCell = (col) => {
          let inputName = props?.row_data + "_" +  col;
          return <input name={inputName} type="text" />
      }
      
      return (<tr>
            <Td value={props?.row_data} key={props?.row_data} /> 
            { 
                props?.colHeaders.map((col, index) => {
                    return <Td value={editableCell(col)} key={index} />
                })
            }
          </tr>
       );
  }

  return props?.editable ? editableMarkup() : noneEditableMarkup();
}

const endsWith = (str, suffix) => {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export const EditableDataTable = (props) => {
    const {rowHeaders, colHeaders} = props;
     console.log("Editable data table", rowHeaders, colHeaders);
    const [data]  = useState([]); 

    return (
              <table className="table align-items-center table-flush">
                <TableHeader headers={colHeaders}  showActions={false} skipCell0 />
                <tbody>
                
                 {
                      rowHeaders && rowHeaders.map((row, index) => {
                            return  <Tr row_data={row} 
                               key={index}  
                               colHeaders={colHeaders}  
                               editable />;
                      })
                 }

                </tbody>
              </table>

    );
}

const DataTable = (props) => {
    const [tableHeaders, setTableHeaders]  = useState([]); 
    const [rowData, setRowData]  = useState([]); 

    const dictValuesToList = (records) => {
          let dictValues = [];
          Object.entries(records||{}).map(([key, value]) =>{
              if(!endsWith(key, "_id") && !(key === 'id')){
                let sentanceCaseKey = key.split('_').map((wd) => {
                    return (wd.charAt(0).toUpperCase() + wd.slice(1) + " ");
                });
                dictValues = [...dictValues, {key:sentanceCaseKey, value:value}];
              }
          });
          return dictValues;
    }

    useEffect(() => {

        if(props?.data && props.data instanceof Array){ 
            let raw_headers = Object.keys(props.data[0]||{}).map((key) => {
                if(!endsWith(key, "_id") && !(key === 'id') && !Array.isArray(props.data[0][key])){
                    let strs = key.split('_').map((wd) => {
                        return (wd.charAt(0).toUpperCase() + wd.slice(1));
                    });
                    return strs.join(' ');
                }
            }).filter(Boolean);
            setTableHeaders(raw_headers);
            setRowData(props.data);
        } else {
          setRowData(dictValuesToList(props?.data));
        }

    }, [props.data]);

    return (
    <>
              <table className="table align-items-center table-flush ">
                <TableHeader headers={tableHeaders}  showActions={props.showActions && true}/>
                <tbody>
                
                 {
                    rowData ? (
                        rowData.map((row, index) => {
                            if(Array.isArray(row.value) ){
                                let headerRow = <Tr row_data={{value:row.key}} key={index} recordId={row.id} colspan={2} heading={true}/>
                                let table = <DataTable data={row.value} detailedTable={false} />
                                return [headerRow, table];
                            } else if(row?.value && typeof(row.value) == "object"){
                                let _data = dictValuesToList(row.value);
                                let headerRow = <Tr row_data={{value:row.key}} key={index} recordId={row.id} colspan={2} heading={true}  />
                                let newRows =  _data.map((innerRow, innerIndex) => {
                                   return <Tr  row_data={innerRow}  key={index + "."+ innerIndex } showActions={false}  recordId={row.id} />
                                });
                                return [headerRow, ...newRows];
                            } else {
                                return  <Tr row_data={row} key={index} showActions={props.showActions} recordId={row.id}  />;
                            }
                        })
                    ) : ( <tr><td>No records found </td></tr> )
                 }

                </tbody>
              </table>
              </>

    );
}

const Home = styled.div`
    width: 100%;
    height: auto; 
    .graph-containers{
        background-color: #fff;
        height:460px;
        width:100%;
    }
    .action-icons {
        color : blue;
    }
    `

export default DataTable;

