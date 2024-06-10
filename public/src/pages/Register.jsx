import React, { useState,useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
import Logo from "../assets/logo.webp";

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  useEffect(() => {
    const checkLocalStorage = async () => {
      if (localStorage.getItem('chat-app-user')) {
        navigate('/login');
      }
    };
  
  
    checkLocalStorage();
  }, [navigate]); 
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation",registerRoute);
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute,{
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate("/");
      }
    }
  };



  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "password should be same.", toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater then 3 characters",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater then 8 character", toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error(
        "Email is required", toastOptions
      );
      return false;
    }
    return true;
  };


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
          <img src={Logo} alt='logo' />
            <h1>Chat App</h1>
          </div>
          <input type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)} />

          <input type='email'
            placeholder='Email'
            name='email'
            onChange={(e) => handleChange(e)} />

          <input type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)} />

          <input type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={(e) => handleChange(e)} />

          <button type='submit'>
            Create User
          </button>
          <span>
            Already have an account?
            <Link to="/login"> Login Here</Link>
          </span>
        </form>
      </FormContainer>

      <ToastContainer />
    </>
  );
}


const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand {

    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
     img {
      height: 2.5rem;
    }
    h1 {
      color:rgb(203, 111, 174);
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    height:85vh;
    width:50vw;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid aqua;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid rgb(203, 111, 174);
      outline: none;
    }
  }
  button {
    background-color: aqua;
    color: black;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color:rgb(203, 111, 174);;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: rgb(193, 73, 155);
      text-decoration: none;
      font-weight: bold;
    }
  }
`;



export default Register