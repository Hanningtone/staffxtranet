import {useState, useContext, useEffect, useCallback} from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import logo from "../../assets/images/logo.jpeg";
import styled from "styled-components";
import { setLocalStorage }  from '../../utils/local-storage';
import {Context}  from '../../context';
import makeRequest from "../../utils/fetch-request";
import CustomModalPane from "../../utils/_modal";
import ResetPasswordForm from "./ResetPasswordForm";

const LoginForm = () => {

    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useContext(Context);
    const [classname, setClassname] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch({type:"SET", key:'context', payload:'eventspage'});
    }, [])
  
    useEffect(() => {
      if(state?.context){
        let status = state[state.context].status;
        let message = state[state.context].message;
        let data = state[state.context]?.data || {};
  
        if(status === true){
          setClassname('alert alert-success');     
        } else {
          setClassname('alert alert-danger');
        }
        setMessage(message);
      }
  
    }, [state?.eventspage])
    
    const showModalForm = () => {

    }
    const handleSubmitUserLogin = (values:any) => {                                            
        let endpoint = '/auth/login';
        console.log(" Values Passed ", values);                                       
        setLoading(true)                                                      
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            console.log(" Response Status", response, status);
            setLoading(false)                                                 
            if(status === 200 ){
                setLocalStorage('user', response.data);
                dispatch({type:'SET', key:'user', payload:response.data});
                navigate('/home')
                console.log(" Response on 200", response, status)
            } else {             
                console.log("Response error", response, status);
                setError(response.message)
            }                                                                   
        })                                                                      
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return(
        <Card>
            <img className="imglogo text-center" src={logo} alt="Uncover Logo"/>
            <h5 className="mt-3 mb-5 text-center">Staff Extranet Login</h5>
            <span role="alert" className="form-alert bigger">{error}</span>
            <div className="form-container ">
                <form onSubmit={handleSubmit(handleSubmitUserLogin)}>
                    <div className="form-group">
                        <label htmlFor="username" className="mb-1">Username </label>
                        <input type="text" 
                            className="form-control py-2" 
                            id="username" 
                            placeholder="Enter username"
                            aria-invalid={errors.username ? "true" : "false"}
                            {...register('username', { required: true})}
                        />
                        {errors.username && (
                            <span role="alert" className="form-alert">Check your username</span>
                        )}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password" className="mb-1">Password</label>
                        <input 
                        type="password" 
                        className="form-control py-2" 
                        id="password" 
                        placeholder="Password"
                        aria-invalid={errors.password ? "true" : "false"}
                        {...register('password', { required: true})}/>
                        {errors.password && (
                            <span role="alert" className="form-alert">Check your password</span>
                        )}
                    </div>
                    {/* <div className="form-group text-center mt-3">
                       <a href="/home" className="btn btn-success btn-block px-5 py-2">  Login  </a>
                    </div> */}

                <div className="">
                        {!loading ?
                            <button type="submit" className="btn btn-primary">   Login  </button>
                            :
                            <button type="button" className="btn btn-primary" disabled>   Please wait...  </button>
                        }
                    </div>
                    <p onClick={ () => setShowModal(true) }> Forgot Passsword? </p>
                </form>
            </div>
              <CustomModalPane
                show={showModal}
                title=" Reset Password"
                target="reset=password"
                hideThisModal={() => setShowModal(false)}
              >
                {message && <div className={classname}>{message}</div>}
                <ResetPasswordForm setShowModal={showModal} />
              </CustomModalPane>
        </Card>
    )
}

const Card = styled.div`
    padding: 1rem;
    width: 470px;
    text-align: center;
    margin: 0 auto;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .imglogo{
        width:200px;
        height:35px;
    }
    .form-group{
        text-align: left
    }
    .login-form-wrapper img{
        width: 150px;
        height: 50px;
        object-fit: contain;
    }
    .form-container{
        border: 1px solid #333;
        padding: 30px;
        width: 100%;
        border-radius: 5px;
    }
    
    .bigger{
        font-size:15px;
        margin-bottom:7px;
    }`

export default LoginForm;
