import {useState, useContext, useEffect, useCallback} from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import logo from "../../assets/images/logo.jpeg";
import styled from "styled-components";
import { useMutation} from 'react-query';
import UserService from "../../services/UserService";
import { setLocalStorage, getFromLocalStorage } from '../../utils/local-storage';
import {Context}  from '../../context';

const LoginForm = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [processing, setIsProcessing] = useState(false);

    const [state, dispatch] = useContext(Context);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { isLoading: isLoading, mutate: loginPress } = useMutation<any, Error>(
        async () => {
            return await UserService.loginByEmailPassword(
              {
                email : email,
                password: password
              });
            }
        ,
        {
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify(data.data));
            navigate('/home');
        },
        onError: (err: any) => {
            setError(err.response.data.message);
        }
        }
    ); 

    const onSubmit = (values: any) => {
        setEmail(values['email']);
        setPassword(values['password']);
        if(email && password){
            loginPress();
        }
    };

    useEffect(()=>{
       if(isLoading){
           setIsProcessing(true)
       }
       setIsProcessing(false);
    }, [isLoading])

    return(
        <Card>
            <img className="imglogo text-center" src={logo} alt="Uncover Logo"/>
            <h5 className="mt-3 mb-5 text-center">Staff Extranet Login</h5>
            <span role="alert" className="form-alert bigger">{error}</span>
            <div className="form-container ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email" className="mb-1">Email address</label>
                        <input type="text" 
                            className="form-control py-2" 
                            id="email" 
                            placeholder="Enter email"
                            aria-invalid={errors.email ? "true" : "false"}
                            {...register('email', { required: true})}
                        />
                        {errors.email && (
                            <span role="alert" className="form-alert">Check your email</span>
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
                    <div className="form-group text-center mt-3">
                       <a href="/home" className="btn btn-success btn-block px-5 py-2">  Login  </a>
                    </div>
                </form>
            </div>
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
