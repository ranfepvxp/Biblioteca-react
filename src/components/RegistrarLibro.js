import React, { useState,useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import LibrosService from '../services/LibrosService';

import MainContext from '../MainContext';

function RegistrarLibro()
{
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
        delete libro.id;
        LibrosService.Post(libro)
        .then(response=>{
          setComponentState('start');
        }).catch(error=> {
          console.log(error); 
        })
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
      <input className='form-control mb-3' name='nombre' type='text' placeholder='Nombre' onChange={handleChange} />
      <input className='form-control mb-3' name='autor' type='text' placeholder='Autor'  onChange={handleChange}  />
      <input className='form-control mb-3' name='editorial' type='text' placeholder='Editorial' onChange={handleChange} />
      <input className='form-control mb-3' name='año' type='text' placeholder='Año'  onChange={handleChange}  />
      <label htmlFor="img">
      Selecciona una imagen de portada
      </label>
      <input className='form-control mb-3' id="img" name='imagen-file' type='file' value={selectedFile} onChange={e=>handleImgInput(e.target.files)} />
      <input className='form-control mb-3' name='imagen' type='hidden' placeholder='Año'  onChange={handleChange}  />
      <input className='form-control mb-3' name='cantidadDisponible' type='text' placeholder='Cantidad'  onChange={handleChange}  />
      <input className='btn btn-primary' type='button' onClick={()=> librosPost() } value={'Registrar'} />
      
    </div>
  )

}

export default RegistrarLibro;