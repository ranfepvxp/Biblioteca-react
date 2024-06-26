import React, { useState,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import LibrosService from '../services/LibrosService';

import MainContext from '../MainContext';

function RegistrarLibro()
{
    const msg = "Completa los datos";
    const [respuesta,setRespuesta] = useState(msg);
    const {setComponentState} = useContext(MainContext);
    const [selectedFile] = useState(null);
   
    const [libro,setLibro] = useState({
        id:0,
        nombre:'',
        autor:'',
        editorial:'',
        año:'',
        imagen:'',
        cantidadDisponible:0
    });

    const librosPost = async() => {

      if(respuesta !== msg)
      {
        delete libro.id;
        LibrosService.Post(libro)
        .then(response=>{
          console.log(response);
          if(response.data!=null){
          setComponentState('Inicio');
          }
          else
          {
          setRespuesta('Ocurrio un problema');
          }
        }).catch(error=> {
          setRespuesta('Ocurrio un problema');
          console.log(error); 
        })
      }

    }

    const handleImgInput = (files) => {
      const file =  files.item(0);
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          setLibro({
            ...libro,
            imagen:reader.result.toString()});
        };
    }
  
    const handleChange = e=>{
        const {name, value} = e.target;

        if(value==="")
        {
          setRespuesta(msg);
        }
        else
        {
          setRespuesta("");
        }

        setLibro ({
        ...libro,
        [name]:value
      })

    }

    
  return (
    <div className='col-6'>      
      <div className='col-1 mb-3'>
        <button className='btn btn-sm btn-primary' onClick={()=>{setComponentState('Inicio')}} > Regresar</button>
      </div>
      <h1>Registrar Libro</h1>
      <input className='form-control mb-3' name='nombre' type='text' placeholder='Nombre' onChange={handleChange} onBlur={handleChange} />
      <input className='form-control mb-3' name='autor' type='text' placeholder='Autor'  onChange={handleChange}  onBlur={handleChange} />
      <input className='form-control mb-3' name='editorial' type='text' placeholder='Editorial' onChange={handleChange} onBlur={handleChange} />
      <input className='form-control mb-3' name='año' type='text' placeholder='Año'  onChange={handleChange}  onBlur={handleChange} />
      <label htmlFor="img">
      Selecciona una imagen de portada
      </label>
      <input className='form-control mb-3' id="img" name='imagen-file' type='file' value={selectedFile} onChange={e=>handleImgInput(e.target.files)} />
      <input className='form-control mb-3' name='imagen' type='hidden' placeholder='Año'  onChange={handleChange}  onBlur={handleChange} />
      <input className='form-control mb-1' name='cantidadDisponible' type='text' placeholder='Cantidad'  onChange={handleChange}  onBlur={handleChange} />
      <div className='mb-2 text-danger'>{respuesta}</div>
      <input className='btn btn-primary' type='button' onClick={()=> librosPost() } value={'Registrar'} />
      
    </div>
  )

}

export default RegistrarLibro;