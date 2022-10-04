import styled from "styled-components";
import { useForm } from "react-hook-form";//@ts-ignore
import { ReactCountryDropdown } from 'react-country-dropdown'
import 'react-country-dropdown/dist/index.css'

interface Props {
    setShowModal: any
}

const CategoriesForm = (props: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSelect = (country: any) => {
    }

    const onSubmit = (values: any) => {
    }

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Category Title</label>
                    <input type="text" className="form-control" id="marketName" aria-invalid={errors.categoryName ? "true" : "false"}
                    {...register('marketName', { required: true})}/>
                     {errors.marketName && (
                        <span role="alert" className="form-alert">Enter market name</span>
                     )}
                </div>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">Country</label>
                    <input type="text" className="form-control" value="Kenya" disabled id="country"  
                    {...register('country', { required: true})}/>
                     {errors.country && (
                        <span role="alert" className="form-alert">Enter country</span>
                     )}
                </div>
                <div className="form-group my-3">
                    <label htmlFor="hotel-name">City/Town/Region</label>
                    <input type="text" className="form-control" id="city" 
                     {...register('city', { required: true})}/>
                     {errors.city && (
                        <span role="alert" className="form-alert">Enter city</span>
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