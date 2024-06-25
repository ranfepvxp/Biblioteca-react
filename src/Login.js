import React, { useState,useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Modal,ModalBody,ModalFooter,ModalHeader } from 'reactstrap';

import MainContext from './MainContext';
import LoginService from './services/LoginService';

function Login() {


  const {user,setUser,componentState,setComponentState} = useContext(MainContext);

  const [usuario,setData] = useState({
    id:'',
    nombre:'',
    email: '',
    contraseña:'',
    tipo: 0
  });


  const handleChange = e=>{
      const {name, value} = e.target;
      setData({
        ...usuario,
        [name]:value
      })
  }
  
  
  const usuariosPost = async() => {
    delete usuario.id;
    LoginService.Post(usuario)
    .then(response=>{
      setComponentState('start');
      setUser( response.data.nombre);      
    }).catch(error=> {
      console.log(error); 
      })
  }

  return (
    <div>
      <h1>Inicia Sesion {componentState}</h1>
      <input className='form-control' name='email' type='text' placeholder='Email' onChange={handleChange} />
      <input className='form-control' name='contraseña' type='password' placeholder='Contraseña (123)'  onChange={handleChange}  />
      <input className='btn btn-primary' type='button' onClick={()=>usuariosPost()} value={'Login'} />
    </div>
  )

}


export default Login;