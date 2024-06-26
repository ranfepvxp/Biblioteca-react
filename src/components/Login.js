import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainContext from '../MainContext';
import LoginService from '../services/LoginService';
import Validaciones from '../utils/Validaciones';

function Login() {

  const {setUser,setComponentState} = useContext(MainContext);
  const [respuesta,setRespuesta] = useState('');

  const [usuario,setData] = useState({
    id:'',
    nombre:'',
    email: '',
    contraseña:'',
    tipo: 0
  });

  const handleChange = e=>{

    if(Validaciones.isEmpty(e))
      {
        setRespuesta("Llena todos los datos");
      }
      else
      {
        setRespuesta("");
      }


    if(e.target?.name=="email"){
      if(Validaciones.validateEmail(e))
      {
        setRespuesta("");
      }
      else
      {
        setRespuesta("Email invalido");
      }          
    }
   
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
      console.log(response);
      if(response.data!=""){
      setUser( response.data.nombre);
      setComponentState('Inicio');
      }   
      else
      {
        setRespuesta("Datos incorrectos!");
      }
      
    }).catch(error=> {
      console.log(error); 
      })
  }


  return (
    <div>
      <div className='row'>
        <div className='col-1 mb-3'>
          <button className='btn btn-sm btn-primary' onClick={()=>{setComponentState('Inicio')}} > Regresar</button>
        </div>
      </div>
      <div className='row'>
      <div className='col-6'>
        <h1>Inicia Sesion</h1>
        <input className='form-control mb-3' name='email' type='text' placeholder='Email (logen@hotmail.com)' onChange={handleChange} onBlur={handleChange} />
        <input className='form-control mb-1' name='contraseña' type='password' placeholder='Contraseña (123)'  onChange={handleChange}  onBlur={handleChange} />
        <div className='mb-2 text-danger'>{respuesta}</div>
        <input className='btn btn-primary' type='button' onClick={()=>usuariosPost()} value={'Login'} />
       </div>
      </div>
    </div>
  )

}


export default Login;