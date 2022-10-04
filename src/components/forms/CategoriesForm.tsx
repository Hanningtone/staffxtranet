import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";//@ts-ignore
import { ChromePicker } from "react-color";

interface Props {
    setShowModal: any
}

const CategoriesForm = (props: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [colorHexCode, setColorHexCode] = useState("orange");

    const onSubmit = (values: any) => {
    }

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Category Title</label>
                    <input type="text" className="form-control" id="categoryName" 
                            aria-invalid={errors.categoryName ? "true" : "false"}
                            {...register('categoryName', { required: true})}/>
                     {errors.categoryName && (
                            <span role="alert" className="form-alert">Enter category name</span>
                     )}
                </div>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={6}></textarea>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Category Color Code</label>
                    <input type="text" hidden className="form-control" value={colorHexCode} id="colorCode" 
                     aria-invalid={errors.colorCode ? "true" : "false"}
                     {...register('colorCode', { required: true})}/>
                    <div style={{ backgroundColor : colorHexCode, textAlign: "center", width: "100%", marginBottom:10, padding:10, borderRadius:5}}>{colorHexCode}</div>
                    
                    <ChromePicker
                         color={colorHexCode}
                         onChange={(e: any) => setColorHexCode(e.hex)}
                    />
                      {errors.colorCode && (
                            <span role="alert" className="form-alert">Enter category color code</span>
                     )}
                </div>
                <div className="flex-row-btwn modal-bar-wrapper">
                    <button className="btn btn-outline-danger" type="button" onClick={()=>props.setShowModal()}>Close</button>
                    <button className="btn btn-outline-primary ms-2" type="submit">Save</button>
                </div>
            </form>
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
    
`
export default CategoriesForm;