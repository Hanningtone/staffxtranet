import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";//@ts-ignore
import { ChromePicker } from "react-color";
import makeRequest from "../../utils/fetch-request";
import { Context }  from '../../context';

interface Props {
    setShowModal: any
}

const CategoriesForm = (props: Props) => {
    const { category } = props;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [colorHexCode, setColorHexCode] = useState<any>("orange");
    const [responseMessage, setResponseMessages] = useState<any>();
    const [ state, dispatch ] =  useContext(Context);

    const [label, setLabel] = useState<string>("Create Category");

    const hexColorPickChange = (e:any) => {
        setColorHexCode(e.hex)
        setValue("category_color", e.hex);
    }

    const onSubmit = (values: any) => {
        let endpoint;
        if(!category) {
             endpoint = '/categories/create';
        } else {
             endpoint = '/categories/update/' + category.id;
        }
        makeRequest({url:endpoint, method:"post", data:values}).then(([status, result]) => {
            console.log("Result is ", result, "status is ", status);
            if(status > 299){
                if(status < 500) { 
                    const field_errors:any = {};
                    Object.entries(result?.data).forEach( ([key, value]) =>  {
                    });
                    setResponseMessages({status:false, message:result.message});
                } else {
                    setResponseMessages({status:false, message:"Failed to create market due to error"});
                }
            } else {
                 setResponseMessages({status:true, message:result.message, data:result});
                dispatch({type:"SET", key:"page", payload:state?.page === 0 ? 1: 0 });
            } 
        });
    }

    useEffect(() => {
        if(!category) {
           setLabel("Create Category");
        }
        else {
            setLabel("Update Category");
        }
    }, [category]);

    return(
        <FormWrapper>
        
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-header modal-header"><h5 class="modal-title" id="default-modal-pane">{label}</h5><button type="button" class="btn btn-outline-danger" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onClick={()=>props.setShowModal()}>×</span></button></div>
                { responseMessage?.status === true && (<div className = {
             `alert alert-${responseMessage?.status === true ? 'success': 'danger'}`} role="alert">
              {responseMessage?.message} 
            </div>) }
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Category Name</label>
                    <input type="text" className="form-control" id="categoryName"
                            aria-invalid={errors.name ? "true" : "false"}
                            {...register('name', { required: true})}  placeholder="Enter Category Name" defaultValue={category?.name}/>
                     {errors.name && (
                            <span role="alert" className="form-alert">Enter category name</span>
                     )}
                </div>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Description</label>
                    <textarea className="form-control" id="description"  placeholder="Describe this Category" { ...register('description', {required:true})} rows={6}  defaultValue={category?.description}></textarea>
                     {errors.description && (
                            <span role="alert" className="form-alert">Category description is required</span>
                     )}
                </div>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Category Color Code</label>
                    <input type="text" hidden className="form-control"  id="colorCode" 
                     aria-invalid={errors.category_color ? "true" : "false"}
                     {...register('category_color', { required: true, value:colorHexCode})}/>
                    <div style={{ backgroundColor : colorHexCode, textAlign: "center", width: "100%", maxWidth:"60px", marginBottom:10, padding:10, borderRadius:5}}>{colorHexCode}</div>
                    
                    <ChromePicker
                         color={colorHexCode}
                         onChange={hexColorPickChange}
                    />
                      {errors.colorCode && (
                            <span role="alert" className="form-alert">Enter category color code</span>
                     )}
                </div>
                <div className="flex-row-btwn modal-bar-wrapper">
                    <button className="btn btn-outline-danger" type="button" onClick={()=>props.setShowModal()}>Close</button>
                    <button className="btn btn-outline-primary ms-2" type="submit">{label}</button>
                </div>
            </form>
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
    
`
export default CategoriesForm;
