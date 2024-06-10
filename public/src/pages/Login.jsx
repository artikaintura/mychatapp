import React, { useState,useEffect } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
import Logo from "../assets/logo.webp";
function Login() {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  },[navigate]);
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      //console.log("in validation",loginRoute);
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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
    const { password, username } = values;
    if (password === "") {
      toast.error("Email and Password are required.", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Email and Password are required.", toastOptions);
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
            onChange={(e) => handleChange(e)} 
            min="3"/>

          <input type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)} />

          <button type='submit'>
            Login
          </button>
          <span>
            Don't have an account?
            <Link to="/register"> Register Here</Link>
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

export default Login