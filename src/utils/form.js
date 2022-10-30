import React, { useEffect, useState,useContext,useRef } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import * as Yup from 'yup';
import makeRequest from "./fetch-request";
import { Context }  from '../context';
import Select, { Option, ReactSelectProps } from 'react-select'
import moment from 'moment'
import styled from 'styled-components';

import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik,
    FieldProps
} from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Form = (props) => {
    const {enctype, ...rest } = props;
    return (
        <Formik {...rest} >
            <FormikForm className="needs-validation" noValidate="" encType={enctype}>
                {props.children}
            </FormikForm >
        </Formik>
    );
};

export const DateTimePickerField = (props)  => {
    const { name, label, placeholder, ...rest } = props;
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    return (
        <div className="form-group" >
            {label && <label htmlFor={name} className="form-control-label">{label}</label>}
            <DatePicker
                className="form-control"
                type="text"
                style={{"zindex":999}}
                autocomplete="off"
                name={name}
                id={name}
                showTimeSelect
                shouldHighlightWeekends
                placeholder={placeholder || ""} 
                selected={(field.value && new Date(field.value)) || null}
                onChange={(val) => { setFieldValue(field.name, moment(val).format('YYYY-MM-DD HH:mm')); }}
                dateFormat="yyyy-MM-dd hh:ss"
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} ><small>{msg}</small></div>} />
        </div>
    );
};

export const DatePickerField = (props)  => {
    const { name, label, placeholder, ...rest } = props;
    const [field, , { setValue }] = useField(props);
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className="form-control-label">{label}</label>}
            <DatePicker
                className="form-control"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                selected={(field.value && new Date(field.value)) || null}
                onChange={(val) => { setValue(moment(val).format('YYYY-MM-DD')); }}
                dateFormat="yyyy-MM-dd"
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} ><small>{msg}</small></div>} />
        </div>
    );
};

export const HiddenField = (props)  => {
    const { name,  value } = props;
    return (
        <div >
            <Field
                type="hidden"
                name={name}
                id={name}
                value={value}
            />
        </div>
    );
};

export const MultipleFileUploadField = (props)  => {
    const MAX_COUNT = 10;
    const { name,  label, value, accept} = props;
    const { setFieldValue } = useFormikContext(); 
    const [warnMessage, setWarnMessage] = useState();

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    setWarnMessage(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) { 
            setUploadedFiles(uploaded);
            setFieldValue(name, uploaded);
        }

    }

    const callOnChangeFunction = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }

    const removeUploadedFile = (file) => {
        let chosenFiles = uploadedFiles.filter((f) =>  f.name !== file.name );
        setUploadedFiles(chosenFiles);
    }

    let inputProps={
        id: name,
        name: name,
        multiple:true,
        accept:accept,
        className:"form-control",
        onChange: e => callOnChangeFunction(e),
    }

    return (
        <div className="form-group" >
            {label && <label htmlFor={name} className="form-control-label">{label}</label>}
            <input
                type="file"
                { ...inputProps }
            />
            <div className="uploaded-files-list" style={{marginTop:"10px"}}>
                {uploadedFiles.map(file => (
                    <div  style={{display:"inline-block", marginRight:"5px", position:"relative"}}>
                        <img style={{height: "50px"}} id={file.name} src={URL.createObjectURL(file)} alt="" />
                        <div style={{fontSize:"10px"}}>{file.name} </div>
                        <div 
                           style={{
                            position:"absolute", 
                            color:"red", 
                            fontSize:"8px", 
                            top:0, 
                            right:0,
                            background:"#fff",
                            textAlign:"center",
                            padding:"0px 2px",
                            border:"1px solid #eee",
                            borderRadius:"2px",
                            cursor:"pointer",
                            display:"block",

                        }} 
                        onClick={() => removeUploadedFile(file)}> X </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const FileUploadField = (props)  => {
    const { name,  label, value, onChangeFunction } = props;
    const [field, , { setValue }] = useField(props);

    const { setFieldValue } = useFormikContext(); 
    const [customData, setCustomData] = useState()
   
    const setFileFiledData = (data) =>{
       setFieldValue("data", data);
    }

    const callOnChangeFunction = (e) => {
       setValue( e.target.files[0]);
       onChangeFunction(e, setFileFiledData);
    }

    let inputProps={
        id: name,
        name: name,
        className:"form-control",
        onChange: e => callOnChangeFunction(e),
    }

    return (
        <div className="form-group" >
            {label && <label htmlFor={name} className="form-control-label">{label}</label>}
            <input
                type="file"
                { ...inputProps }
            />
        </div>
    );
};
export const TextAreaField = (props)  => {
    const { name, label, placeholder, value, ...rest } = props;
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className="form-control-label">{label}</label>}
            <Field as="textarea"
                className="form-control"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} ><small>{msg}</small></div>} />
        </div>
    );
};

export const PasswordField = (props)  => {
    const { name, label, placeholder, value, ...rest } = props;
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className="form-control-label">{label}</label>}
            <Field
                className="form-control"
                type="password"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} ><small>{msg}</small></div>} />
        </div>
    );
};

export const TextField = (props)  => {
    const { name, label, placeholder, value, ...rest } = props;
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className="form-control-label">{label}</label>}
            <Field
                className="form-control"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} ><small>{msg}</small></div>} />
        </div>
    );
};

export const PlaceSelector = (props) => {
 const { name, label, placeholder } = props;

 const [value, setValue] = useState(null);
 const { setFieldValue } = useFormikContext(); 

 const setFormFieldValue = (value) => {
     console.log("Setting location to ", value);
     let location = {
        name: value.value.description
    }
    geocodeByAddress(location.name)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
            location = {                                                            
             ...location, lat: lat, lng:lng                                               
             } 
             setFieldValue(name, JSON.stringify(location));
      });

     setValue(value)
 }


 return (
        <div className="form-group">
            {label && <label htmlFor={name} className="form-control-label">{label}</label>}

             <GooglePlacesAutocomplete
                  name={name}
                  placeholder={placeholder}
                  apiOptions={{language:"en", region:"ke"}}
                  autocompletionRequest = {{
                    componentRestrictions: { country: ['ke'], }
                   }}
                   selectProps={{ value,onChange: setFormFieldValue,}}

                  apiKey="AIzaSyBeo35IlDz0_a8z249o1zcR1p93roxMPA4"
                />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} ><small>{msg}</small></div>} />
        </div>
      
    );
};

export const CustomSelectField= ({ options, field, form, custmonChangeFunction,}) => {
    const onChange = null; 
    const onSelectionChanged = (opt, ev) => {
        if(custmonChangeFunction){
            custmonChangeFunction(opt);
        }
        form.setFieldValue(field.name, opt.value);
    }

    return (
          <Select
            options={options}
            name={field.name}
            value={options ? options.find(option => option.value === field.value) : ''}
            onChange={onSelectionChanged}
            onBlur={field.onBlur}
          />
        );
}

export const SelectField = (props) => {
    const { name, label, options, value, onChange } = props;
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className="form-control-label">{label}</label>}
            <Field name={name} value={value} custmonChangeFunction={onChange} component={CustomSelectField} options={options} />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} ><small>{msg}</small></div>} />
        </div>
    );
};

export const DatabaeSelectField = (props) => {
    const { name, label, placeholder, options, model, model_display_col } = props;  
    let _props = {
        name: name,
        id:name,
        label: label,
        placeholder: placeholder,
    };

    if(props.onChange){
       _props.onChange = props.onChange;
    }
    let query_params = "";
    if(props.where){
       Object.entries(props.where).forEach(([key,params]) => {
           if(query_params){
               query_params += "&";
           }
           query_params += params.column +"="+params.value;
       }); 
    }
    const [new_props, setNewProps] = useState(_props);
    
    useEffect(() => {
       const abortController = new AbortController();
       let endpoint = "/"+model+"/get?"+query_params;
        
        makeRequest({url:endpoint, method:"get", data:null }).then(([status, response]) => {
            let {data, message, meta} = response;
            console.log('Received options data ', data, status)
            if(status === 200){
                console.log('Status === 200 ok')
                setNewProps(props);
                let options = []
                Object.entries(data)?.forEach( ([key, record]) =>  {
                    let staff_options = {};
                    staff_options["value"] = record.id;          
                    let label_text = "";
                    model_display_col.forEach((col) => {
                        if(label_text){
                            label_text += " - ";
                        } 
                        label_text += record[col] ;
                    });
                    staff_options["label"] = label_text;         
                    options = [...options, staff_options]
                });
                _props.options = options;
                setNewProps({...props, ...{options:options}});
            }
            
        });

        return () => {
            abortController.abort();
        };
    }, []);
    return <SelectField  {...new_props} />
   
};

export const RadioGroupField = (props) => {
    const { name, label, placeholder, options,class_name, ...rest } = props;
    return (
        <div className="row form-group">
          <div className={class_name}>
             { label && <label className="" htmlFor={name}>{label}</label> }
          </div>
          <div className={class_name}>
              {(options||[]).map((optn, index) => <label key={index} className="col-6"> <Field type="radio" value={optn.value}  name={name} /> {optn.label} </label>)}
          </div>
          <div className="col-12">
              <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} ><small>{msg}</small></div>} />
          </div>
        </div>
    );
};
export const CheckBoxField = (props) => {
    const { name, label, placeholder, value, checked, ...rest } = props;
    return (
        <div className="custom-control custom-checkbox">
          <Field 
              name={name}
              render={({field, form}) => {
                  return (
                      <input
                         type={"checkbox"}
                         id={name}
                         className={"custom-control-input"}
                         checked={field.value}
                         {...field} />
                  );
              }}
           />
        { label && <label className="custom-control-label" htmlFor={name}>{label}</label> }
        <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} ><small>{msg}</small></div>} />
        </div>
    );
};

export const SubmitButton = (props) => {
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();
    return (
         <button type="submit" {...rest} disabled={isSubmitting}>{isSubmitting ? "Please wait..." : title}</button>
    );
};

export const initForm = (formSchema) => {
    let formData = {};
    let validationSchema = {};
    for(var key of Object.keys(formSchema)){

        formData[key] = formSchema[key].value ||  "";
        if(formSchema[key].type === "text"){
            validationSchema[key] = Yup.string();
        }else if(formSchema[key].type === "email"){
            validationSchema[key] = Yup.string().email()
        }else if(formSchema[key].type === "select"){
            validationSchema[key] = Yup.string();
        } else if(formSchema[key].type === "textarea"){
            validationSchema[key] = Yup.string(); 
        } else if(formSchema[key].type === "db_select"){
            validationSchema[key] = Yup.string(); 
        } else if(formSchema[key].type === "radio"){
            validationSchema[key] = Yup.string(); 
        } else if(formSchema[key].type === "password"){
            validationSchema[key] = Yup.string(); 
        }
        if(formSchema[key].required){
            validationSchema[key] = validationSchema[key].required('Required');
        } else if (validationSchema[key]) {
            validationSchema[key] = validationSchema[key].nullable();
        }
        
    }
    validationSchema = Yup.object().shape({...validationSchema});
    return {formData, validationSchema};
};


export const getFormElement = (elementName, elementSchema) => {
    const props = {
        name: elementName,
        label: elementSchema.label,
        value: elementSchema.value ||"",
        placeholder:elementSchema.placeholder || ""
    }

    if(elementSchema?.onChangeFunction){
       props.onChangeFunction = elementSchema.onChangeFunction;
    }

    if(elementSchema?.accept){
       props.accept = elementSchema.accept;
    }


    //optional props
    if(elementSchema.options && ['select', 'db_select', 'radio'].includes(elementSchema.type) ){
        props.options = elementSchema.options;
    }

    if(elementSchema.model){
        props.model = elementSchema.model;
    }

    if(elementSchema.class_name){
        props.class_name = elementSchema.class_name;
    }
    if(elementSchema.model_display_col){
       props.model_display_col = elementSchema.model_display_col;
    }

    if(elementSchema.onChange){
        props.onChange = elementSchema.onChange;
    }

    if(elementSchema.where){
        props.where = elementSchema.where;
    }    
    if (elementSchema.type === "text" || elementSchema.type === "email") {
        return <TextField {...props} />
    }

    if (elementSchema.type === "select") {
        return <SelectField  {...props} />
    }

    if (elementSchema.type === "radio") {
        return <RadioGroupField  {...props} />
    }
    if (elementSchema.type === "checkbox") {
        props.checked = elementSchema.checked || false;
        return <CheckBoxField  {...props} />
    }
    if (elementSchema.type === "textarea") {
        return <TextAreaField  {...props} />
    }
    if (elementSchema.type === "hidden") {
        return <HiddenField  {...props} />
    }
    if (elementSchema.type === "date") {
        return <DatePickerField  {...props} />
    }

    if (elementSchema.type === "datetime") {
        return <DateTimePickerField  {...props} />
    }
    if (elementSchema.type === "db_select") {
        return <DatabaeSelectField  {...props} />
    }
    if (elementSchema.type === "password") {
        return <PasswordField  {...props} />
    }
    if (elementSchema.type === "fileupload") {
        return <FileUploadField  {...props} />
    }
    if (elementSchema.type === "multiplefileupload") {
        return <MultipleFileUploadField  {...props} />
    }
    if (elementSchema.type === "places") {
        return <PlaceSelector  {...props} />
    }
};

export const LoadForm = (formSchema, submitLabel, endpoint, 
    enctype="") => {
   
   const {formData, validationSchema} = initForm(formSchema);
   
   const [ state, dispatch ] =  useContext(Context);
   const [responseMessage, setResponseMessage] = useState();
   const [isError, setIsError] = useState();


   const onSubmit = (values, { setSubmitting,  resetForm, setStatus, setErrors}) => {
    console.log("Calling on submit funtion wih encytype", enctype);
       setIsError(null);
       console.log("Sumnitting values", values);

       makeRequest({url:endpoint, method:"post", data:values, enctype:enctype}).then(([status, result]) => {
           console.log("Result is ", result, "status is ", status);
           if(status > 299){
                setIsError(true);
               if(status < 500) { 
                   const field_errors = {};
                   Object.entries(result?.data).forEach( ([key, value]) =>  {
                       field_errors[key] = value[0];
                   });
                   setErrors(field_errors);

                   setResponseMessage("A validation Error occurred. Please Contact Admin")

               } else {
                    setIsError(true);

                   setResponseMessage("Sorry, An internal error occurred. Please contact admin");
               }
           } else {
                setIsError(false);
                setResponseMessage(result.message);
                resetForm();
                console.log("Dispatching state page  ", state?.page)
                dispatch({type:"SET", key:"page", payload: state?.page == 1 ? 0: 1});
                //result

                console.log("Should have some state already ", state?.page)
           } 
           setSubmitting(false);
       });
   }
   

   return ( 
       <Form
        enableReinitialize={true}
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit} 
        enctype = {enctype}

        >
        { responseMessage && <div className={isError ? "alert alert-danger" : "alert alert-success"}>
                {responseMessage}
               </div>
           }
        {Object.keys(formSchema).map( (key, ind) => (
            <div key={key}>
                {getFormElement(key, formSchema[key])}
            </div>
        ))}
        <SubmitButton key="k-submit-f" className="btn btn-primary" title={submitLabel} />
     </Form> 
   );
};
